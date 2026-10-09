import Joi from "joi";
import { ROLE } from "../../utils/constant";

const create = {
  body: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
    role: Joi.string().valid(ROLE.publisher).required(),
    publisherName: Joi.string().trim().required(),
    description: Joi.string().trim().allow(""),
    booksCount: Joi.number().integer().min(0),
    verified: Joi.boolean(),
  }),
};

export = {
  create,
};
