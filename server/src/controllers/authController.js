import { User } from '../models/index.js';
import { generateTokenPair, verifyRefreshToken, getTokenExpiration } from '../utils/jwt.js';
import { generateOTP, generateRandomToken, hashString } from '../utils/crypto.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { asyncHandler } from '../middleware/error.js';
import logger from '../config/logger.js';

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const {
    firstName, lastName, email, phone, password,
  } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return errorResponse(res, 'Email already registered', 400);
    }
    return errorResponse(res, 'Phone number already registered', 400);
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    role: 'student',
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokenPair(user._id, user.role);

  // Store refresh token
  user.refreshTokens.push({
    token: hashString(refreshToken),
    createdAt: new Date(),
    expiresAt: getTokenExpiration(process.env.JWT_REFRESH_EXPIRES_IN),
    device: req.get('user-agent'),
    ipAddress: req.ip,
  });

  await user.save();

  // Set refresh token in httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Send response
  successResponse(res, {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    accessToken,
    refreshToken,
  }, 'Registration successful', 201);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user with password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return errorResponse(res, 'Invalid credentials', 401);
  }

  // Check if user is active
  if (!user.isActive) {
    return errorResponse(res, 'Your account has been deactivated', 403);
  }

  // Check if user is blocked
  if (user.isBlocked) {
    return errorResponse(res, 'Your account has been blocked', 403);
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return errorResponse(res, 'Invalid credentials', 401);
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokenPair(user._id, user.role);

  // Store refresh token
  user.refreshTokens.push({
    token: hashString(refreshToken),
    createdAt: new Date(),
    expiresAt: getTokenExpiration(process.env.JWT_REFRESH_EXPIRES_IN),
    device: req.get('user-agent'),
    ipAddress: req.ip,
  });

  // Update last login
  user.lastLogin = new Date();

  // Keep only last 5 refresh tokens
  if (user.refreshTokens.length > 5) {
    user.refreshTokens = user.refreshTokens.slice(-5);
  }

  await user.save();

  // Set refresh token in httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Log activity
  logger.info(`User logged in: ${user.email}`);

  // Send response
  successResponse(res, {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      preferences: user.preferences,
    },
    accessToken,
    refreshToken,
  }, 'Login successful');
});

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh
// @access  Public
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.cookies;

  if (!token) {
    return errorResponse(res, 'Refresh token not provided', 401);
  }

  // Verify token
  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch (error) {
    return errorResponse(res, 'Invalid or expired refresh token', 401);
  }

  // Find user
  const user = await User.findById(decoded.userId);

  if (!user || !user.isActive) {
    return errorResponse(res, 'User not found or inactive', 401);
  }

  // Check if refresh token exists in database
  const tokenHash = hashString(token);
  const tokenExists = user.refreshTokens.some((t) => t.token === tokenHash);

  if (!tokenExists) {
    return errorResponse(res, 'Invalid refresh token', 401);
  }

  // Generate new access token
  const { accessToken, refreshToken: newRefreshToken } = generateTokenPair(user._id, user.role);

  // Replace old refresh token with new one
  user.refreshTokens = user.refreshTokens.filter((t) => t.token !== tokenHash);
  user.refreshTokens.push({
    token: hashString(newRefreshToken),
    createdAt: new Date(),
    expiresAt: getTokenExpiration(process.env.JWT_REFRESH_EXPIRES_IN),
    device: req.get('user-agent'),
    ipAddress: req.ip,
  });

  await user.save();

  // Set new refresh token cookie
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  successResponse(res, { accessToken }, 'Token refreshed successfully');
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.cookies;

  if (token) {
    // Remove refresh token from database
    const tokenHash = hashString(token);
    await User.updateOne(
      { _id: req.userId },
      { $pull: { refreshTokens: { token: tokenHash } } },
    );
  }

  // Clear cookie
  res.clearCookie('refreshToken');

  successResponse(res, null, 'Logged out successfully');
});

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select('-refreshTokens');

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  successResponse(res, { user }, 'User retrieved successfully');
});

// @desc    Update profile
// @route   PUT /api/v1/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const allowedUpdates = [
    'firstName',
    'lastName',
    'phone',
    'profile',
    'preferences',
  ];

  const updates = {};

  Object.keys(req.body).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.userId,
    updates,
    { new: true, runValidators: true },
  ).select('-refreshTokens');

  successResponse(res, { user }, 'Profile updated successfully');
});

// @desc    Change password
// @route   PUT /api/v1/auth/password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.userId).select('+password');

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  // Verify current password
  const isValid = await user.comparePassword(currentPassword);

  if (!isValid) {
    return errorResponse(res, 'Current password is incorrect', 400);
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Invalidate all refresh tokens
  user.refreshTokens = [];
  await user.save();

  successResponse(res, null, 'Password changed successfully. Please login again.');
});

// @desc    Register FCM token for push notifications
// @route   POST /api/v1/auth/fcm-token
// @access  Private
export const registerFCMToken = asyncHandler(async (req, res) => {
  const { token, device } = req.body;

  const user = await User.findById(req.userId);

  // Check if token already exists
  const tokenExists = user.fcmTokens.some((t) => t.token === token);

  if (!tokenExists) {
    user.fcmTokens.push({
      token,
      device: device || req.get('user-agent'),
      createdAt: new Date(),
    });

    // Keep only last 3 tokens per user
    if (user.fcmTokens.length > 3) {
      user.fcmTokens = user.fcmTokens.slice(-3);
    }

    await user.save();
  }

  successResponse(res, null, 'FCM token registered successfully');
});

export default {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  updateProfile,
  changePassword,
  registerFCMToken,
};
