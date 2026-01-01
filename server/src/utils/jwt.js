import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Generate access token
export const generateAccessToken = (userId, role) => {
  const payload = {
    userId,
    role,
    type: 'access',
    jti: uuidv4(),
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  });
};

// Generate refresh token
export const generateRefreshToken = (userId, role) => {
  const payload = {
    userId,
    role,
    type: 'refresh',
    jti: uuidv4(),
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });
};

// Verify access token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

// Decode token without verification (for checking expiration)
export const decodeToken = (token) => jwt.decode(token);

// Generate token pair
export const generateTokenPair = (userId, role) => {
  const accessToken = generateAccessToken(userId, role);
  const refreshToken = generateRefreshToken(userId, role);

  return { accessToken, refreshToken };
};

// Calculate token expiration date
export const getTokenExpiration = (expiresIn) => {
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) return new Date(Date.now() + 15 * 60 * 1000); // default 15 minutes

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return new Date(Date.now() + value * multipliers[unit]);
};
