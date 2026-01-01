import { validationResult } from 'express-validator';
import { validationErrorResponse } from '../utils/response.js';

// Middleware to handle validation errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  next();
};

export default validate;
