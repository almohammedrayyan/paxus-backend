/*************************************************
 * SmartMeet microservices - Admin
 * schema.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import plugins
import Joi from "joi";
import { ROLE } from "../../utils/constant";

const create = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string().allow(""),
    email: Joi.string().email().required(),
    avatar: Joi.string().allow(""),
    state: Joi.string().allow(""),
    city: Joi.string().allow(""),
    country: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    password: Joi.string().min(8).required(),
    role: Joi.string()
      .valid(...Object.values(ROLE))
      .required(),
  }),
};

const update = {
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
    firstName: Joi.string(),
    lastName: Joi.string().allow(""),
    email: Joi.string().email(),
    avatar: Joi.string().allow(""),
    state: Joi.string().allow(""),
    city: Joi.string().allow(""),
    country: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    password: Joi.string().min(8).required(),
    role: Joi.string()
      .valid(...Object.values(ROLE))
      .required(),
  }),
};

const getById = {
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
};

const deleteById = {
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
};

export = {
  create,
  update,
  getById,
  deleteById,
};
