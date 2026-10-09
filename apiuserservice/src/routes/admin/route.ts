/*************************************************
 * SmartMeet microservices - Admin
 * route.ts
 * Created by Mohammed Fuzail on 24/09/2026
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
route.post(END_POINT.create, validateSchema(schema.create), controller.create);
route.get(
  END_POINT.getById,
  validateSchema(schema.getById),
  controller.getById,
);
route.get(END_POINT.update, validateSchema(schema.update), controller.update);
route.get(END_POINT.getAll, controller.getAll);
route.delete(
  END_POINT.getAll,
  validateSchema(schema.deleteById),
  controller.deleteById,
);

// exports
export default route;
