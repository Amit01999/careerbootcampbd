import connectDB from '../server/src/config/database.js';

let app;
let isInitialized = false;

export default async function handler(req, res) {
  try {
    // Initialize only once per serverless container
    if (!isInitialized) {
      const imported = await import('../server/src/app.js');
      app = imported.default;

      await connectDB();

      isInitialized = true;
      console.log('✅ Serverless backend initialized');
    }

    return app(req, res);
  } catch (error) {
    console.error('❌ SERVERLESS ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
}
