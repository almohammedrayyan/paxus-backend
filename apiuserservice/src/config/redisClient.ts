/*************************************************
 * SmartMeet microservices - Admin
 * redisClient.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import plugin
import { createClient } from "redis";

// import utils
import logger from "./logger";
import config from "./config";

// const values
const redisClient = createClient({
  url: config.redisConnectionString,
});

// event functions
redisClient.on("error", (error: any) => {
  logger.error(`redis error: ${error}`);
});

redisClient.on("connect", () => {
  logger.info("redis connected");
});

// exports
export default redisClient;
