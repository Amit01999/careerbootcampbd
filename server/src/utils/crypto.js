import crypto from 'crypto';

// Generate random token
export const generateRandomToken = (length = 32) => crypto.randomBytes(length).toString('hex');

// Generate OTP
export const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i += 1) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};

// Hash string using SHA256
export const hashString = (str) => crypto.createHash('sha256').update(str).digest('hex');

// Encrypt data
export const encrypt = (text, secretKey) => {
  const iv = crypto.randomBytes(16);
  const key = crypto.createHash('sha256').update(secretKey).digest();
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
};

// Decrypt data
export const decrypt = (encrypted, secretKey) => {
  const parts = encrypted.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  const key = crypto.createHash('sha256').update(secretKey).digest();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

// Generate secure random string
export const generateSecureString = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i += 1) {
    result += chars[randomBytes[i] % chars.length];
  }

  return result;
};
