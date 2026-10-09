/*************************************************
 * SmartMeet Microservices - Tips Middleware
 * apiToken.ts
 * Created by Fuzail on 03/10/2026
 * Copyright
 *************************************************/

// import plugins
import moment from "moment";
import jwt from "jsonwebtoken";

// import utils
import config from "../config/config";
import redisClient from "../config/redisClient";

// service functions
const onSave_Token = async (
  token: string,
  userID: string,
  type: "AccessToken" | "RefreshToken" | "PasswordToken" | "EnrollmentToken",
) => {
  let tokenObject = {
    token,
    userID,
  };
  let key = `${type}_User_${userID}`;

  const tokenDoc = await redisClient.SET(key, JSON.stringify(tokenObject));
  return tokenDoc;
};

const onDelete_Token = async (
  userID: string,
  type: "AccessToken" | "RefreshToken" | "PasswordToken" | "EnrollmentToken",
) => {
  let key = `${type}_User_${userID}`;

  const tokenDoc = await redisClient.DEL(key);
  return tokenDoc;
};

const onGenerate_Token = (
  userID: any,
  expiry: any,
  secretKey = config.jwt.secretKey,
) => {
  const payload = {
    sub: userID,
    iat: moment().unix(),
    exp: expiry.unix(),
    tokenId: `${secretKey}_${userID}`,
  };

  const token = jwt.sign(payload, secretKey);
  return token;
};

const onGet_AccessToken = async (userID: any) => {
  const expiry = moment().add(config.jwt.accessExpirationMinutes, "minutes");
  const token = onGenerate_Token(userID, expiry);

  await onSave_Token(token, userID, "AccessToken");

  return {
    token,
    expiry,
  };
};

const onGet_RefreshToken = async (userID: any) => {
  const expiry = moment().add(config.jwt.refreshExpirationDays, "days");
  const token = onGenerate_Token(userID, expiry);

  await onSave_Token(token, userID, "RefreshToken");

  return {
    token,
    expiry,
  };
};

const onGenerate_AuthTokens = async (userID: any) => {
  const access = await onGet_AccessToken(userID);
  const refresh = await onGet_RefreshToken(userID);

  return {
    access,
    refresh,
  };
};

const onRemove_AuthTokens = async (userID: any) => {
  await onDelete_Token(userID, "AccessToken");
  await onDelete_Token(userID, "RefreshToken");
  await onDelete_Token(userID, "PasswordToken");
};

const onVerify_Token = async (
  token: string,
  type: "AccessToken" | "RefreshToken" | "PasswordToken" | "EnrollmentToken",
) => {
  const payload: any = jwt.verify(token, config.jwt.secretKey);

  // const tokenObjectStr: any = await redisClient.GET(
  //   `${type}_User_${payload.sub}`
  // );

  // const tokenObject = JSON.parse(tokenObjectStr);

  // if (!tokenObject) {
  //   return null;
  // }
  // if (tokenObject.userID !== payload.sub) {
  //   return null;
  // }
  // if (tokenObject.token !== token) {
  //   return null;
  // }

  return payload;
};

const onGenerate_VoiceEnrollmentToken = async (facultyID: any) => {
  const expiry = moment().add(config.jwt.voiceEnrollmentExpirationDays, "days");
  const token = onGenerate_Token(facultyID, expiry);

  return token;
};

const onVerify_VoiceEnrollmentToken = async (token: string) => {
  try {
    const payload: any = await onVerify_Token(token, "EnrollmentToken");

    if (payload?.sub) {
      return payload.sub;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

// exports
export {
  onGenerate_AuthTokens,
  onRemove_AuthTokens,
  onVerify_Token,
  onGenerate_VoiceEnrollmentToken,
  onVerify_VoiceEnrollmentToken,
};
