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
import { apiMessage } from "./apiMessage";

// helper functions
const onSend_CatchResponse = (res: Response, error: any) => {
  const statusCode =
    typeof error?.statusCode === "number"
      ? error.statusCode
      : httpStatus.INTERNAL_SERVER_ERROR;

  res.status(statusCode).send({
    message: error?.message || apiMessage.somethingWentWrong,
    success: false,
    data: null,
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
