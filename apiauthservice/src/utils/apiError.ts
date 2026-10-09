/*************************************************
 * SmartMeet microservices - Admin
 * apiError.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// class
class ApiError extends Error {
  statusCode: string | number;
  isOperational: boolean;

  constructor(
    statusCode: string | number,
    message: string,
    isOperational: boolean = true,
    stack: string = "",
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// exports
export default ApiError;
