import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

dotenv.config();

export const ADMIN_EMAIL = 'career.signaturepublication@gmail.com';
export const ADMIN_PASSWORD = 'career@Admin2026';

const addAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing in environment');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let user = await User.findOne({ email: ADMIN_EMAIL });
    if (!user) {
      user = await User.create({
        firstName: 'System',
        lastName: 'Admin',
        email: ADMIN_EMAIL,
        phone: '+8801700000000',
        password: ADMIN_PASSWORD,
        role: 'admin',
        isEmailVerified: true,
        isPhoneVerified: true,
        isActive: true,
      });
      console.log('Created admin user');
    } else {
      user.password = ADMIN_PASSWORD;
      user.role = 'admin';
      user.isEmailVerified = true;
      user.isPhoneVerified = true;
      user.isActive = true;
      await user.save();
      console.log('Updated admin user');
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('\nError adding admin:', error);
    process.exit(1);
  }
};

const currentFile = fileURLToPath(import.meta.url);
const executedFile = process.argv[1] ? path.resolve(process.argv[1]) : '';

if (executedFile && currentFile === executedFile) {
  addAdmin();
}

export default addAdmin;
