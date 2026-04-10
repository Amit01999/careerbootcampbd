import os from 'node:os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Temp directory for multer disk storage and one-off generated files.
 * Vercel/AWS Lambda only allow writing under os.tmpdir() (e.g. /tmp).
 */
export function getUploadTempDir() {
  if (process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), 'private-bank-bootcamp-uploads');
  }
  return path.join(__dirname, '../../uploads/temp');
}
