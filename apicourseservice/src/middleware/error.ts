/*************************************************
 * SmartMeet microservices - Admin
 * error.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import plugins
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

// import utils
import config from "../config/config";
import logger from "../config/logger";
import ApiError from "../utils/apiError";
import { SERVER_TYPE } from "../utils/constant";

// error handling functions
const onError_Converter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

// eslint-disable-next-line no-unused-vars
const onError_Handler = (err: any, req: Request, res: Response) => {
  let { statusCode, message } = err;

  if (config.env === SERVER_TYPE.prod && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === SERVER_TYPE.dev && { stack: err.stack }),
  };

  if (config.env === SERVER_TYPE.dev) {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

// exports
export { onError_Converter, onError_Handler };
