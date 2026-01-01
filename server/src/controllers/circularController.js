import { Circular, User } from '../models/index.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import slugify from 'slugify';
import { sendNotification } from '../services/notificationService.js';

/**
 * @route   GET /api/v1/circulars
 * @desc    Get all active job circulars (public)
 * @access  Public
 */
export const getCirculars = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    bankName,
    category,
    division,
    district,
    priority,
    search,
    sortBy = '-publishedDate',
  } = req.query;

  const query = {
    status: 'published',
    isActive: true,
    applicationDeadline: { $gte: new Date() }, // Only active circulars
  };

  // Build filter query
  if (bankName) query.bankName = { $regex: bankName, $options: 'i' };
  if (category) query.category = category;
  if (division) query.divisions = division;
  if (district) query.districts = district;
  if (priority) query.priority = priority;

  // Search
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { titleBn: { $regex: search, $options: 'i' } },
      { bankName: { $regex: search, $options: 'i' } },
      { position: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [circulars, total] = await Promise.all([
    Circular.find(query)
      .select('-description -descriptionBn -applicationProcess') // Exclude heavy fields for list
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Circular.countDocuments(query),
  ]);

  // Add isExpired flag
  circulars.forEach((circular) => {
    circular.isExpired = new Date(circular.applicationDeadline) < new Date();
  });

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, circulars, pagination, 'Circulars retrieved successfully');
});

/**
 * @route   GET /api/v1/circulars/:idOrSlug
 * @desc    Get single circular details
 * @access  Public
 */
export const getCircularById = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };

  const circular = await Circular.findOne(query);

  if (!circular) {
    return errorResponse(res, 'Circular not found', 404);
  }

  // Increment view count asynchronously (don't wait)
  Circular.findByIdAndUpdate(circular._id, { $inc: { views: 1 } }).exec();

  successResponse(res, circular, 'Circular retrieved successfully');
});

/**
 * @route   POST /api/v1/circulars/:id/save
 * @desc    Save/bookmark a circular
 * @access  Private (Student)
 */
export const saveCircular = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.id);

  if (!circular) {
    return errorResponse(res, 'Circular not found', 404);
  }

  const user = await User.findById(req.user.id);

  // Toggle save
  const savedCirculars = user.savedCirculars || [];
  const index = savedCirculars.findIndex((id) => id.toString() === circular._id.toString());

  if (index > -1) {
    // Already saved, remove it
    savedCirculars.splice(index, 1);
    user.savedCirculars = savedCirculars;
    await user.save();

    return successResponse(res, null, 'Circular removed from saved list');
  } else {
    // Add to saved
    savedCirculars.push(circular._id);
    user.savedCirculars = savedCirculars;
    await user.save();

    return successResponse(res, null, 'Circular saved successfully');
  }
});

/**
 * @route   GET /api/v1/circulars/saved
 * @desc    Get user's saved circulars
 * @access  Private (Student)
 */
export const getSavedCirculars = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate({
    path: 'savedCirculars',
    match: { isActive: true },
    options: { sort: '-publishedDate' },
  });

  successResponse(res, user.savedCirculars || [], 'Saved circulars retrieved successfully');
});

// ============ ADMIN ROUTES ============

/**
 * @route   POST /api/v1/admin/circulars
 * @desc    Create new job circular
 * @access  Admin
 */
export const createCircular = asyncHandler(async (req, res) => {
  const circularData = {
    ...req.body,
    slug: slugify(req.body.title, { lower: true, strict: true }),
    createdBy: req.user.id,
  };

  const circular = await Circular.create(circularData);

  successResponse(res, circular, 'Circular created successfully', 201);
});

/**
 * @route   GET /api/v1/admin/circulars
 * @desc    Get all circulars (including drafts) for admin
 * @access  Admin
 */
export const getAllCircularsAdmin = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    status,
    category,
    priority,
    search,
    sortBy = '-createdAt',
  } = req.query;

  const query = {};

  if (status) query.status = status;
  if (category) query.category = category;
  if (priority) query.priority = priority;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { bankName: { $regex: search, $options: 'i' } },
      { position: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [circulars, total] = await Promise.all([
    Circular.find(query)
      .populate('createdBy', 'firstName lastName email')
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Circular.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, circulars, pagination, 'Circulars retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/circulars/:id
 * @desc    Get circular by ID for editing
 * @access  Admin
 */
export const getCircularByIdAdmin = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.id)
    .populate('createdBy', 'firstName lastName email');

  if (!circular) {
    return errorResponse(res, 'Circular not found', 404);
  }

  successResponse(res, circular, 'Circular retrieved successfully');
});

/**
 * @route   PUT /api/v1/admin/circulars/:id
 * @desc    Update circular
 * @access  Admin
 */
export const updateCircular = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.id);

  if (!circular) {
    return errorResponse(res, 'Circular not found', 404);
  }

  // Update slug if title changed
  if (req.body.title && req.body.title !== circular.title) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }

  Object.assign(circular, req.body);
  await circular.save();

  successResponse(res, circular, 'Circular updated successfully');
});

/**
 * @route   DELETE /api/v1/admin/circulars/:id
 * @desc    Delete circular (soft delete)
 * @access  Admin
 */
export const deleteCircular = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.id);

  if (!circular) {
    return errorResponse(res, 'Circular not found', 404);
  }

  circular.isActive = false;
  circular.status = 'cancelled';
  await circular.save();

  successResponse(res, null, 'Circular deleted successfully');
});

/**
 * @route   PATCH /api/v1/admin/circulars/:id/publish
 * @desc    Publish circular and send notification
 * @access  Admin
 */
export const publishCircular = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.id);

  if (!circular) {
    return errorResponse(res, 'Circular not found', 404);
  }

  circular.status = 'published';
  circular.publishedDate = circular.publishedDate || new Date();
  await circular.save();

  // Send push notification to all users (async)
  sendNotification({
    type: 'new_circular',
    title: 'New Job Circular',
    titleBn: 'নতুন চাকরির বিজ্ঞপ্তি',
    message: `${circular.bankName} - ${circular.position}`,
    messageBn: `${circular.bankNameBn || circular.bankName} - ${circular.positionBn || circular.position}`,
    relatedModel: 'Circular',
    relatedId: circular._id,
    actionUrl: `/circulars/${circular.slug}`,
    priority: circular.priority === 'urgent' ? 'high' : 'medium',
    broadcast: true,
  }).catch((err) => console.error('Failed to send notification:', err));

  successResponse(res, circular, 'Circular published and notification sent');
});

/**
 * @route   PATCH /api/v1/admin/circulars/:id/unpublish
 * @desc    Unpublish circular
 * @access  Admin
 */
export const unpublishCircular = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.id);

  if (!circular) {
    return errorResponse(res, 'Circular not found', 404);
  }

  circular.status = 'draft';
  await circular.save();

  successResponse(res, circular, 'Circular unpublished');
});

/**
 * @route   GET /api/v1/admin/circulars/:id/analytics
 * @desc    Get circular analytics (views, saves, etc.)
 * @access  Admin
 */
export const getCircularAnalytics = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.id);

  if (!circular) {
    return errorResponse(res, 'Circular not found', 404);
  }

  // Count users who saved this circular
  const saveCount = await User.countDocuments({
    savedCirculars: circular._id,
  });

  const analytics = {
    views: circular.views,
    saves: saveCount,
    shares: circular.shares,
    publishedDate: circular.publishedDate,
    daysRemaining: Math.ceil(
      (new Date(circular.applicationDeadline) - new Date()) / (1000 * 60 * 60 * 24)
    ),
  };

  successResponse(res, analytics, 'Circular analytics retrieved successfully');
});
