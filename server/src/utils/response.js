// Standardized API response helpers

export const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  const response = {
    success: true,
    message,
    data,
  };

  return res.status(statusCode).json(response);
};

export const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

export const paginatedResponse = (res, data, pagination, message = 'Success') => {
  const response = {
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit),
      hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
      hasPrev: pagination.page > 1,
    },
  };

  return res.status(200).json(response);
};

export const validationErrorResponse = (res, errors) => {
  const formattedErrors = errors.map((err) => ({
    field: err.path || err.param,
    message: err.msg || err.message,
  }));

  return errorResponse(res, 'Validation failed', 400, formattedErrors);
};
