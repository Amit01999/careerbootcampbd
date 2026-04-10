import fs from 'fs/promises';
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async ({ filePath, folder }) => {
  if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new Error('Cloudinary environment variables are not configured');
  }
  if (!filePath) {
    throw new Error('filePath is required for Cloudinary upload');
  }

  try {
    const res = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'image',
    });

    return {
      url: res.secure_url,
      publicId: res.public_id,
      width: res.width,
      height: res.height,
      format: res.format,
      bytes: res.bytes,
    };
  } finally {
    // always best-effort cleanup of the temp file
    try {
      await fs.unlink(filePath);
    } catch {
      // ignore
    }
  }
};

export const deleteImageByPublicId = async (publicId) => {
  if (!publicId) return null;
  if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new Error('Cloudinary environment variables are not configured');
  }
  return cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};

