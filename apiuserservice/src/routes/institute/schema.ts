import Joi from "joi";
import { ROLE } from "../../utils/constant";

const create = {
  body: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
    role: Joi.string().valid(ROLE.institute).required(),
    instituteName: Joi.string().trim().required(),
    description: Joi.string().trim().allow(""),
    verified: Joi.boolean(),
    coursesCount: Joi.number().integer().min(0),
    studentsCount: Joi.number().integer().min(0),
    rating: Joi.number().min(0).max(5),
  }),
};

const getById = {
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
};

export = {
  create,
  getById,
};
