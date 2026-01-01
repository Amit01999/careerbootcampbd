import { User, Exam, ExamAttempt, Payment, Question, Circular, Notification } from '../models/index.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse } from '../utils/response.js';

/**
 * @route   GET /api/v1/admin/dashboard/stats
 * @desc    Get overall platform statistics
 * @access  Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const dateFilter = {};
  if (startDate || endDate) {
    dateFilter.createdAt = {};
    if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
    if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
  }

  // Get counts
  const [
    totalUsers,
    activeUsers,
    totalExams,
    publishedExams,
    totalQuestions,
    totalAttempts,
    totalPayments,
    completedPayments,
    totalCirculars,
    activeCirculars,
  ] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: 'student', isActive: true }),
    Exam.countDocuments(),
    Exam.countDocuments({ isPublished: true, isActive: true }),
    Question.countDocuments({ isActive: true }),
    ExamAttempt.countDocuments({ status: 'submitted' }),
    Payment.countDocuments(),
    Payment.countDocuments({ status: 'completed' }),
    Circular.countDocuments(),
    Circular.countDocuments({ status: 'published', isActive: true }),
  ]);

  // Get revenue stats
  const revenueStats = await Payment.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$amount' },
        todayRevenue: {
          $sum: {
            $cond: [
              {
                $gte: [
                  '$completedAt',
                  new Date(new Date().setHours(0, 0, 0, 0)),
                ],
              },
              '$amount',
              0,
            ],
          },
        },
        thisMonthRevenue: {
          $sum: {
            $cond: [
              {
                $gte: [
                  '$completedAt',
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                ],
              },
              '$amount',
              0,
            ],
          },
        },
      },
    },
  ]);

  // Get recent users (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const newUsersThisWeek = await User.countDocuments({
    role: 'student',
    createdAt: { $gte: sevenDaysAgo },
  });

  const stats = {
    users: {
      total: totalUsers,
      active: activeUsers,
      newThisWeek: newUsersThisWeek,
      inactive: totalUsers - activeUsers,
    },
    exams: {
      total: totalExams,
      published: publishedExams,
      draft: totalExams - publishedExams,
    },
    questions: {
      total: totalQuestions,
    },
    attempts: {
      total: totalAttempts,
    },
    payments: {
      total: totalPayments,
      completed: completedPayments,
      failed: totalPayments - completedPayments,
    },
    revenue: revenueStats[0] || {
      totalRevenue: 0,
      todayRevenue: 0,
      thisMonthRevenue: 0,
    },
    circulars: {
      total: totalCirculars,
      active: activeCirculars,
    },
  };

  successResponse(res, stats, 'Dashboard statistics retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/dashboard/revenue
 * @desc    Get revenue analytics with charts data
 * @access  Admin
 */
export const getRevenueAnalytics = asyncHandler(async (req, res) => {
  const { period = '30' } = req.query; // days

  const startDate = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000);

  // Daily revenue
  const dailyRevenue = await Payment.aggregate([
    {
      $match: {
        status: 'completed',
        completedAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
        revenue: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Revenue by exam
  const revenueByExam = await Payment.aggregate([
    {
      $match: {
        status: 'completed',
        completedAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: '$exam',
        revenue: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'exams',
        localField: '_id',
        foreignField: '_id',
        as: 'examDetails',
      },
    },
    { $unwind: '$examDetails' },
    {
      $project: {
        examTitle: '$examDetails.title',
        revenue: 1,
        count: 1,
      },
    },
    { $sort: { revenue: -1 } },
    { $limit: 10 },
  ]);

  // Revenue by payment method
  const revenueByMethod = await Payment.aggregate([
    {
      $match: {
        status: 'completed',
        completedAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: '$paymentMethod',
        revenue: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { revenue: -1 } },
  ]);

  const analytics = {
    dailyRevenue,
    revenueByExam,
    revenueByMethod,
  };

  successResponse(res, analytics, 'Revenue analytics retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/dashboard/users
 * @desc    Get user growth and activity data
 * @access  Admin
 */
export const getUserAnalytics = asyncHandler(async (req, res) => {
  const { period = '30' } = req.query;

  const startDate = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000);

  // User registration trend
  const userGrowth = await User.aggregate([
    {
      $match: {
        role: 'student',
        createdAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // User activity (exam attempts)
  const userActivity = await ExamAttempt.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        attempts: { $sum: 1 },
        uniqueUsers: { $addToSet: '$user' },
      },
    },
    {
      $project: {
        _id: 1,
        attempts: 1,
        activeUsers: { $size: '$uniqueUsers' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Top performing students
  const topStudents = await User.aggregate([
    { $match: { role: 'student' } },
    { $sort: { 'stats.averageScore': -1 } },
    { $limit: 10 },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        averageScore: '$stats.averageScore',
        totalExams: '$stats.totalExamsTaken',
      },
    },
  ]);

  const analytics = {
    userGrowth,
    userActivity,
    topStudents,
  };

  successResponse(res, analytics, 'User analytics retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/dashboard/exams
 * @desc    Get exam performance data
 * @access  Admin
 */
export const getExamAnalytics = asyncHandler(async (req, res) => {
  // Most popular exams
  const popularExams = await Exam.aggregate([
    { $match: { isPublished: true } },
    { $sort: { totalAttempts: -1 } },
    { $limit: 10 },
    {
      $project: {
        title: 1,
        totalAttempts: 1,
        totalStudents: 1,
        averageScore: 1,
      },
    },
  ]);

  // Exam difficulty analysis
  const difficultyAnalysis = await ExamAttempt.aggregate([
    { $match: { status: 'submitted' } },
    {
      $lookup: {
        from: 'exams',
        localField: 'exam',
        foreignField: '_id',
        as: 'examDetails',
      },
    },
    { $unwind: '$examDetails' },
    {
      $group: {
        _id: '$examDetails.examType',
        attempts: { $sum: 1 },
        averageScore: { $avg: '$scorePercentage' },
        passRate: {
          $avg: { $cond: ['$isPassed', 1, 0] },
        },
      },
    },
  ]);

  // Recent exam attempts
  const recentAttempts = await ExamAttempt.find({ status: 'submitted' })
    .populate('user', 'firstName lastName email')
    .populate('exam', 'title')
    .sort('-submittedAt')
    .limit(20)
    .select('user exam scorePercentage isPassed submittedAt')
    .lean();

  const analytics = {
    popularExams,
    difficultyAnalysis,
    recentAttempts,
  };

  successResponse(res, analytics, 'Exam analytics retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/analytics/export
 * @desc    Export analytics data (CSV format)
 * @access  Admin
 */
export const exportAnalytics = asyncHandler(async (req, res) => {
  const { type = 'revenue', startDate, endDate } = req.query;

  const dateFilter = {};
  if (startDate || endDate) {
    dateFilter.createdAt = {};
    if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
    if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
  }

  let data;
  let filename;
  let headers;

  switch (type) {
    case 'revenue':
      data = await Payment.find({ status: 'completed', ...dateFilter })
        .populate('user', 'firstName lastName email')
        .populate('exam', 'title')
        .select('transactionId user exam amount paymentMethod completedAt')
        .lean();

      headers = ['Transaction ID', 'User', 'Email', 'Exam', 'Amount', 'Method', 'Date'];
      filename = `revenue-report-${Date.now()}.csv`;
      break;

    case 'users':
      data = await User.find({ role: 'student', ...dateFilter })
        .select('firstName lastName email phone createdAt stats.averageScore stats.totalExamsTaken')
        .lean();

      headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Joined', 'Avg Score', 'Total Exams'];
      filename = `users-report-${Date.now()}.csv`;
      break;

    case 'exams':
      data = await ExamAttempt.find({ status: 'submitted', ...dateFilter })
        .populate('user', 'firstName lastName email')
        .populate('exam', 'title')
        .select('user exam scorePercentage isPassed submittedAt')
        .lean();

      headers = ['User', 'Email', 'Exam', 'Score', 'Passed', 'Date'];
      filename = `exam-attempts-report-${Date.now()}.csv`;
      break;

    default:
      return errorResponse(res, 'Invalid export type', 400);
  }

  // Convert to CSV
  let csv = headers.join(',') + '\n';

  data.forEach((row) => {
    const values = Object.values(row).map((val) => {
      if (typeof val === 'object' && val !== null) {
        return JSON.stringify(val).replace(/,/g, ';');
      }
      return val;
    });
    csv += values.join(',') + '\n';
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(csv);
});
