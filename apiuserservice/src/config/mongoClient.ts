/*************************************************
 * SmartMeet microservices - Admin
 * mongoClient.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import plugins
import mongoose from "mongoose";

// import utils
import config from "./config";
import logger from "./logger";

// event functions
const onConnect_MongoDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.mongodbConnectionString)
      .then(() => {
        resolve(true);
        logger.info("mongodb connected");
      })
      .catch((error: any) => {
        logger.error(`mongodb error: ${error}`);
        reject(error);
        process.exit(1);
      });
  });
};

// exports
export default onConnect_MongoDB;
