import dotenv from 'dotenv';
import app from '../src/app.js';

// Load environment variables
dotenv.config();

// Export the Express app as a serverless function
export default app;
