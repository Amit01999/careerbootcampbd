import app from '../src/app.js';
import connectDB from '../src/config/database.js';
import { initializeFirebase } from '../src/config/firebase.js';

let isInitialized = false;

export default async function handler(req, res) {
  if (!isInitialized) {
    await connectDB();
    initializeFirebase();
    isInitialized = true;
  }

  return app(req, res);
}
