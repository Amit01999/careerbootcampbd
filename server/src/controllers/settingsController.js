import { Settings } from '../models/index.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * @route   GET /api/v1/settings
 * @desc    Get public settings
 * @access  Public
 */
export const getPublicSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.getPublic();

  const settingsObject = {};
  settings.forEach((setting) => {
    settingsObject[setting.key] = setting.value;
  });

  successResponse(res, settingsObject, 'Public settings retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/settings
 * @desc    Get all settings (admin)
 * @access  Admin
 */
export const getAllSettings = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const query = {};
  if (category) query.category = category;

  const settings = await Settings.find(query)
    .populate('updatedBy', 'firstName lastName email')
    .sort('category key')
    .lean();

  successResponse(res, settings, 'Settings retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/settings/:key
 * @desc    Get single setting
 * @access  Admin
 */
export const getSettingByKey = asyncHandler(async (req, res) => {
  const setting = await Settings.get(req.params.key);

  if (!setting) {
    return errorResponse(res, 'Setting not found', 404);
  }

  successResponse(res, setting, 'Setting retrieved successfully');
});

/**
 * @route   PUT /api/v1/admin/settings/:key
 * @desc    Update setting value
 * @access  Admin
 */
export const updateSetting = asyncHandler(async (req, res) => {
  const { value } = req.body;

  if (value === undefined) {
    return errorResponse(res, 'Value is required', 400);
  }

  const setting = await Settings.set(req.params.key, value, req.user.id);

  successResponse(res, setting, 'Setting updated successfully');
});

/**
 * @route   POST /api/v1/admin/settings
 * @desc    Create new setting
 * @access  Admin
 */
export const createSetting = asyncHandler(async (req, res) => {
  const { key, value, description, category = 'general', isPublic = false } = req.body;

  // Check if setting already exists
  const existingSetting = await Settings.findOne({ key });

  if (existingSetting) {
    return errorResponse(res, 'Setting with this key already exists', 400);
  }

  const setting = await Settings.create({
    key,
    value,
    description,
    category,
    isPublic,
    updatedBy: req.user.id,
  });

  successResponse(res, setting, 'Setting created successfully', 201);
});

/**
 * @route   DELETE /api/v1/admin/settings/:key
 * @desc    Delete setting
 * @access  Admin
 */
export const deleteSetting = asyncHandler(async (req, res) => {
  const setting = await Settings.findOne({ key: req.params.key });

  if (!setting) {
    return errorResponse(res, 'Setting not found', 404);
  }

  await setting.deleteOne();

  successResponse(res, null, 'Setting deleted successfully');
});

/**
 * @route   GET /api/v1/admin/settings/category/:category
 * @desc    Get settings by category
 * @access  Admin
 */
export const getSettingsByCategory = asyncHandler(async (req, res) => {
  const settings = await Settings.getByCategory(req.params.category);

  const settingsObject = {};
  settings.forEach((setting) => {
    settingsObject[setting.key] = setting.value;
  });

  successResponse(res, settingsObject, 'Settings retrieved successfully');
});

/**
 * @route   POST /api/v1/admin/settings/bulk-update
 * @desc    Update multiple settings at once
 * @access  Admin
 */
export const bulkUpdateSettings = asyncHandler(async (req, res) => {
  const { settings } = req.body; // Array of { key, value }

  if (!Array.isArray(settings) || settings.length === 0) {
    return errorResponse(res, 'Settings array is required', 400);
  }

  const results = [];

  for (const { key, value } of settings) {
    const setting = await Settings.set(key, value, req.user.id);
    results.push(setting);
  }

  successResponse(res, results, `${results.length} settings updated successfully`);
});

/**
 * @route   POST /api/v1/admin/settings/reset-defaults
 * @desc    Reset settings to default values
 * @access  Super Admin only
 */
export const resetToDefaults = asyncHandler(async (req, res) => {
  const defaultSettings = [
    { key: 'site_name', value: 'Private Bank Bootcamp', category: 'general', isPublic: true },
    { key: 'site_email', value: 'info@bankbootcamp.com', category: 'general', isPublic: true },
    { key: 'site_phone', value: '+880-XXX-XXXXXX', category: 'general', isPublic: true },
    { key: 'maintenance_mode', value: false, category: 'general', isPublic: true },
    { key: 'allow_registration', value: true, category: 'general', isPublic: true },

    { key: 'default_exam_duration', value: 60, category: 'exam', isPublic: false },
    { key: 'default_questions_per_exam', value: 50, category: 'exam', isPublic: false },
    { key: 'enable_negative_marking', value: true, category: 'exam', isPublic: false },
    { key: 'negative_mark_percentage', value: 0.25, category: 'exam', isPublic: false },
    { key: 'passing_percentage', value: 40, category: 'exam', isPublic: false },

    { key: 'enable_email_notifications', value: true, category: 'notification', isPublic: false },
    { key: 'enable_push_notifications', value: true, category: 'notification', isPublic: false },
    { key: 'enable_sms_notifications', value: false, category: 'notification', isPublic: false },

    { key: 'currency', value: 'BDT', category: 'payment', isPublic: true },
    { key: 'tax_percentage', value: 0, category: 'payment', isPublic: false },
  ];

  // Delete all existing settings
  await Settings.deleteMany({});

  // Create default settings
  const settings = await Settings.insertMany(
    defaultSettings.map((s) => ({
      ...s,
      updatedBy: req.user.id,
    }))
  );

  successResponse(res, settings, 'Settings reset to defaults successfully');
});
