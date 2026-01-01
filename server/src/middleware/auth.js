import { verifyAccessToken } from '../utils/jwt.js';
import { User } from '../models/index.js';
import { errorResponse } from '../utils/response.js';

// Protect routes - require authentication
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return errorResponse(res, 'Not authorized to access this route', 401);
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Check if user still exists
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return errorResponse(res, 'User no longer exists', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      return errorResponse(res, 'Your account has been deactivated', 403);
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return errorResponse(res, 'Your account has been blocked', 403);
    }

    // Check if user changed password after token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return errorResponse(res, 'Password recently changed. Please login again', 401);
    }

    // Grant access
    req.user = user;
    req.userId = user._id;
    req.userRole = user.role;

    next();
  } catch (error) {
    return errorResponse(res, 'Not authorized to access this route', 401);
  }
};

// Restrict to specific roles
export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return errorResponse(
      res,
      'You do not have permission to perform this action',
      403,
    );
  }

  next();
};

// Optional authentication - attach user if token provided
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId).select('-password');

      if (user && user.isActive && !user.isBlocked) {
        req.user = user;
        req.userId = user._id;
        req.userRole = user.role;
      }
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};

// Check if user owns the resource
export const checkOwnership = (resourceUserField = 'user') => async (req, res, next) => {
  // Admin can access everything
  if (req.user.role === 'admin' || req.user.role === 'super_admin') {
    return next();
  }

  // Check if the resource belongs to the user
  // This assumes the resource ID is in req.params.id
  // and the resource has a field that references the user
  const resourceId = req.params.id;

  // The actual ownership check should be done in the controller
  // This middleware just passes a flag
  req.checkOwnership = {
    field: resourceUserField,
    userId: req.userId,
  };

  next();
};
