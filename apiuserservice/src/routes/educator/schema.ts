import Joi from "joi";
import { ROLE } from "../../utils/constant";

const create = {
  body: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
    role: Joi.string().valid(ROLE.educator).required(),
    bio: Joi.string().trim().allow(""),
    specializations: Joi.array().items(Joi.string().trim()),
    experience: Joi.number().min(0),
    rating: Joi.number().min(0).max(5),
    studentsCount: Joi.number().integer().min(0),
    coursesCount: Joi.number().integer().min(0),
    verified: Joi.boolean(),
  }),
};
const getById = {
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
};

const update = {
  body: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
    bio: Joi.string().trim().allow(""),
    specializations: Joi.array().items(Joi.string().trim()).max(20),
    experience: Joi.number().integer().min(0),
  }).min(2),
};

export = {
  create,
  getById,
  update,
};
