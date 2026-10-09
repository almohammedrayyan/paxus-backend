/*************************************************
 * SmartMeet microservices - Admin
 * cache.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import plugins
import { NextFunction, Request, Response } from "express";

// import utils
import redisClient from "../config/redisClient";

// event functions
const redisCacheMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = req.originalUrl;

    redisClient
      .get(cacheKey)
      .then((cacheData) => {
        if (cacheData) {
          return res.send(JSON.parse(cacheData));
        } else {
          return next();
        }
      })
      .catch((error: any) => {
        return next();
      });
  };

// exports
export { redisCacheMiddleware };
