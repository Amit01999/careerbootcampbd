import { User, ExamAttempt, Payment, AuditLog } from '../models/index.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

/**
 * @route   GET /api/v1/admin/users
 * @desc    Get all users with filters
 * @access  Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    role,
    isActive,
    isBlocked,
    search,
    sortBy = '-createdAt',
  } = req.query;

  const query = {};

  if (role) query.role = role;
  if (isActive !== undefined) query.isActive = isActive === 'true';
  if (isBlocked !== undefined) query.isBlocked = isBlocked === 'true';

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password -refreshTokens')
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    User.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, users, pagination, 'Users retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/users/:id
 * @desc    Get user details
 * @access  Admin
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password -refreshTokens')
    .lean();

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  // Get additional stats
  const [attemptCount, totalRevenue, lastActivity] = await Promise.all([
    ExamAttempt.countDocuments({ user: user._id, status: 'submitted' }),
    Payment.aggregate([
      { $match: { user: user._id, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    ExamAttempt.findOne({ user: user._id })
      .sort('-createdAt')
      .select('createdAt')
      .lean(),
  ]);

  user.additionalStats = {
    totalAttempts: attemptCount,
    totalSpent: totalRevenue[0]?.total || 0,
    lastActive: lastActivity?.createdAt,
  };

  successResponse(res, user, 'User details retrieved successfully');
});

/**
 * @route   PATCH /api/v1/admin/users/:id/activate
 * @desc    Activate user account
 * @access  Admin
 */
export const activateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  user.isActive = true;
  await user.save();

  // Log audit
  await AuditLog.log({
    user: req.user.id,
    action: 'user_activated',
    resource: 'User',
    resourceId: user._id,
    changes: { before: { isActive: false }, after: { isActive: true } },
  });

  successResponse(res, user, 'User activated successfully');
});

/**
 * @route   PATCH /api/v1/admin/users/:id/deactivate
 * @desc    Deactivate user account
 * @access  Admin
 */
export const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  user.isActive = false;
  await user.save();

  // Log audit
  await AuditLog.log({
    user: req.user.id,
    action: 'user_deactivated',
    resource: 'User',
    resourceId: user._id,
    changes: { before: { isActive: true }, after: { isActive: false } },
  });

  successResponse(res, user, 'User deactivated successfully');
});

/**
 * @route   PATCH /api/v1/admin/users/:id/block
 * @desc    Block user account
 * @access  Admin
 */
export const blockUser = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  user.isBlocked = true;
  user.blockReason = reason;
  await user.save();

  // Log audit
  await AuditLog.log({
    user: req.user.id,
    action: 'user_blocked',
    resource: 'User',
    resourceId: user._id,
    changes: { before: { isBlocked: false }, after: { isBlocked: true, reason } },
  });

  successResponse(res, user, 'User blocked successfully');
});

/**
 * @route   PATCH /api/v1/admin/users/:id/unblock
 * @desc    Unblock user account
 * @access  Admin
 */
export const unblockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  user.isBlocked = false;
  user.blockReason = undefined;
  await user.save();

  // Log audit
  await AuditLog.log({
    user: req.user.id,
    action: 'user_unblocked',
    resource: 'User',
    resourceId: user._id,
    changes: { before: { isBlocked: true }, after: { isBlocked: false } },
  });

  successResponse(res, user, 'User unblocked successfully');
});

/**
 * @route   PUT /api/v1/admin/users/:id/role
 * @desc    Change user role
 * @access  Super Admin only
 */
export const changeUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!['student', 'admin', 'super_admin'].includes(role)) {
    return errorResponse(res, 'Invalid role', 400);
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  const oldRole = user.role;
  user.role = role;
  await user.save();

  // Log audit
  await AuditLog.log({
    user: req.user.id,
    action: 'user_role_changed',
    resource: 'User',
    resourceId: user._id,
    changes: { before: { role: oldRole }, after: { role } },
  });

  successResponse(res, user, 'User role updated successfully');
});

/**
 * @route   DELETE /api/v1/admin/users/:id
 * @desc    Delete user account permanently
 * @access  Super Admin only
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  // Don't allow deleting super admins
  if (user.role === 'super_admin') {
    return errorResponse(res, 'Cannot delete super admin account', 403);
  }

  // Log audit before deletion
  await AuditLog.log({
    user: req.user.id,
    action: 'user_deleted',
    resource: 'User',
    resourceId: user._id,
    changes: { before: user.toObject(), after: null },
  });

  await user.deleteOne();

  successResponse(res, null, 'User deleted successfully');
});

/**
 * @route   GET /api/v1/admin/users/:id/activity
 * @desc    Get user activity log
 * @access  Admin
 */
export const getUserActivity = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [activity, total] = await Promise.all([
    AuditLog.find({ user: req.params.id })
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    AuditLog.countDocuments({ user: req.params.id }),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, activity, pagination, 'User activity retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/users/:id/payments
 * @desc    Get user's payment history
 * @access  Admin
 */
export const getUserPayments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [payments, total] = await Promise.all([
    Payment.find({ user: req.params.id })
      .populate('exam', 'title')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Payment.countDocuments({ user: req.params.id }),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, payments, pagination, 'User payments retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/users/:id/exams
 * @desc    Get user's exam attempts
 * @access  Admin
 */
export const getUserExamAttempts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [attempts, total] = await Promise.all([
    ExamAttempt.find({ user: req.params.id, status: 'submitted' })
      .populate('exam', 'title examType')
      .sort('-submittedAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    ExamAttempt.countDocuments({ user: req.params.id, status: 'submitted' }),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, attempts, pagination, 'User exam attempts retrieved successfully');
});
