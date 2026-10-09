/*************************************************
 * SmartMeet microservices - Admin
 * helper.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import plugins
import { Response } from "express";
import httpStatus from "http-status";

// import utils
import ApiError from "./apiError";
import { apiMessage } from "./apiMessage";

// helper functions
const onSend_CatchResponse = (res: Response) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: apiMessage.somethingWentWrong,
    success: false,
    data: new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      apiMessage.somethingWentWrong,
    ),
  });
};

const onGenerate_Password = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  const passwordLength = 8;
  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

// exports
export { onSend_CatchResponse, onGenerate_Password };
