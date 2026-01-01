import app from '../server/src/app.js';
import connectDB from '../server/src/config/database.js';
import { initializeFirebase } from '../server/src/config/firebase.js';

let isInitialized = false;

export default async function handler(req, res) {
  if (!isInitialized) {
    await connectDB();
    initializeFirebase();
    isInitialized = true;
  }

  return app(req, res);
}
