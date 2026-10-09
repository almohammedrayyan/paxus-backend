/*************************************************
 * SmartMeet microservices - Tips Middleware
 * config.ts
 * Created by Rayyan on 20/08/2026
 * Copyright
 *************************************************/

// import plugins
import Joi from "joi";
import dotenv from "dotenv";
import * as path from "path";

// import utils
import { SERVER_TYPE } from "../utils/constant";

// env congig
dotenv.config({ path: path.join(__dirname, "../../.env.dev") });

// schema
const schema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string()
      .valid(
        SERVER_TYPE.dev,
        SERVER_TYPE.qa,
        SERVER_TYPE.stage,
        SERVER_TYPE.prod,
      )
      .required(),

    REDIS_CONNECTION_STRING: Joi.string().required(),
    MONGODB_CONNECTION_STRING: Joi.string().required(),

    JWT_SECRET_KEY: Joi.string().required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(1),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(60),
    JWT_VOICE_ENROLLMENT_EXPIRATION_DAYS: Joi.number().default(7),
  })
  .unknown();

// const values
const { value, error } = schema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// exports
export = {
  port: value.PORT,
  env: value.NODE_ENV,

  redisConnectionString: value.REDIS_CONNECTION_STRING,
  mongodbConnectionString: value.MONGODB_CONNECTION_STRING,

  jwt: {
    secretKey: value.JWT_SECRET_KEY,
    refreshExpirationDays: value.JWT_REFRESH_EXPIRATION_DAYS,
    accessExpirationMinutes: value.JWT_ACCESS_EXPIRATION_MINUTES,
    voiceEnrollmentExpirationDays: value.JWT_VOICE_ENROLLMENT_EXPIRATION_DAYS,
  },
};
