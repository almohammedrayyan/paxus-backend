/*************************************************
 * SmartMeet Microservices - Tips Middleware
 * route.ts
 * Created by Maniratnam on 03/01/2025
 * Copyright
 *************************************************/

// import plugins
import express from "express";

// import utils
import schema from "./schema";
import controller from "./controller";
import { END_POINT } from "../../utils/apiURL";
import { validateSchema } from "../../middleware";

// const values
const route = express.Router();

// router maping
route.post(END_POINT.login, validateSchema(schema.login), controller.login);
route.post(END_POINT.logout, validateSchema(schema.logout), controller.logout);

// exports
export default route;
