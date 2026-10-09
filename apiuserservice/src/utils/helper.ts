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

const onGenerateId = (role: string, lastId?: string) => {
  const rolePrefix: Record<string, string> = {
    student: "stu",
    institute: "ins",
    publisher: "pub",
    educator: "edu",
  };

  const prefix = rolePrefix[role.toLowerCase()];

  if (!prefix) {
    throw new Error("Invalid role");
  }

  if (!lastId) {
    return `${prefix}-A001`;
  }

  const match = lastId.match(new RegExp(`^${prefix}-([A-Z])(\\d{3})$`, "i"));

  const letter = match?.[1];
  const numberText = match?.[2];

  if (!letter || !numberText) {
    return `${prefix}-A001`;
  }

  const currentLetter = letter.toUpperCase();
  const currentNumber = Number(numberText);

  const nextLetter =
    currentNumber === 999
      ? String.fromCharCode(currentLetter.charCodeAt(0) + 1)
      : currentLetter;

  const nextNumber = currentNumber === 999 ? 1 : currentNumber + 1;

  return `${prefix}-${nextLetter}${String(nextNumber).padStart(3, "0")}`;
};
// exports
export { onSend_CatchResponse, onGenerate_Password, onGenerateId };
