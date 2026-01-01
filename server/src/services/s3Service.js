import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import s3Client from '../config/s3.js';
import logger from '../config/logger.js';

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'bootcamp-files';

/**
 * Upload file or buffer to S3
 */
export const uploadToS3 = async (fileOrBuffer, originalName, contentType = null) => {
  try {
    let fileContent;
    
    // Check if input is a buffer or file path
    if (Buffer.isBuffer(fileOrBuffer)) {
      fileContent = fileOrBuffer;
    } else {
      fileContent = await fs.readFile(fileOrBuffer);
    }

    // Generate unique file name
    const fileExtension = originalName.split('.').pop();
    const fileName = uuidv4() + '.' + fileExtension;
    const key = 'uploads/' + fileName;

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: contentType || 'application/octet-stream',
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Return public URL (for MinIO) or construct S3 URL
    const url = process.env.S3_ENDPOINT + '/' + BUCKET_NAME + '/' + key;

    logger.info('File uploaded to S3: ' + key);

    return {
      fileName,
      key,
      url,
    };
  } catch (error) {
    logger.error('Error uploading to S3:', error);
    throw error;
  }
};

/**
 * Get signed URL for private file
 */
export const getSignedFileUrl = async (key, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });

    return url;
  } catch (error) {
    logger.error('Error generating signed URL:', error);
    throw error;
  }
};

/**
 * Delete file from S3
 */
export const deleteFromS3 = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);

    logger.info('File deleted from S3: ' + key);

    return true;
  } catch (error) {
    logger.error('Error deleting from S3:', error);
    throw error;
  }
};

/**
 * Upload buffer to S3 (kept for backwards compatibility)
 */
export const uploadBufferToS3 = async (buffer, originalName, contentType = 'application/octet-stream') => {
  return uploadToS3(buffer, originalName, contentType);
};

export default {
  uploadToS3,
  getSignedFileUrl,
  deleteFromS3,
  uploadBufferToS3,
};
