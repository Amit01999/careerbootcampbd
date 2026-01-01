// Custom validation functions

export const isValidObjectId = (id) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
};

export const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

export const isValidBangladeshiPhone = (phone) => {
  const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;
  return phoneRegex.test(phone);
};

export const isStrongPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const sanitizeHtml = (html) => {
  // Basic HTML sanitization - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');
};

export const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const normalizePhone = (phone) => {
  // Convert to standard format: +8801XXXXXXXXX
  let normalized = phone.trim();

  if (normalized.startsWith('01')) {
    normalized = `+88${normalized}`;
  } else if (normalized.startsWith('8801')) {
    normalized = `+${normalized}`;
  }

  return normalized;
};

export const validateFileType = (mimetype, allowedTypes) => allowedTypes.includes(mimetype);

export const validateFileSize = (size, maxSize) => size <= maxSize;
