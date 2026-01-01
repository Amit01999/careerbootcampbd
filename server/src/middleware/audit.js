import { AuditLog } from '../models/index.js';

// Middleware to log API requests
export const auditLog = (action, resource) => async (req, res, next) => {
  const startTime = Date.now();

  // Store original res.json
  const originalJson = res.json.bind(res);

  // Override res.json to capture response
  res.json = function (data) {
    const duration = Date.now() - startTime;

    // Log to audit trail (async, don't wait)
    AuditLog.log({
      user: req.user?._id || null,
      action,
      resource,
      resourceId: req.params.id || null,
      method: req.method,
      endpoint: req.originalUrl,
      status: data.success ? 'success' : 'failure',
      statusCode: res.statusCode,
      errorMessage: data.success ? null : data.message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
      metadata: {
        params: req.params,
        query: req.query,
      },
      duration,
    }).catch((err) => {
      console.error('Failed to create audit log:', err);
    });

    // Call original json
    return originalJson(data);
  };

  next();
};

export default auditLog;
