/*************************************************
 * SmartMeet microservices - Admin
 * schema.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import plugins
import Joi from "joi";

const create = {
  body: Joi.object().keys({
    courseId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    provider: Joi.string().allow(""),
    providerType: Joi.string().valid("educator", "institute"),
    providerId: Joi.string().allow(""),
    category: Joi.string().allow(""),
    subjects: Joi.array().items(Joi.string()),
    stage: Joi.string().allow(""),
    language: Joi.string().allow(""),
    price: Joi.number().min(0),
    originalPrice: Joi.number().min(0),
    duration: Joi.string().allow(""),
    lessons: Joi.number().integer().min(0),
    thumbnail: Joi.string().allow(""),
    featured: Joi.boolean(),
    tags: Joi.array().items(Joi.string()),
  }),
};

const update = {
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
    courseId: Joi.string(),
    title: Joi.string(),
    description: Joi.string().allow(""),
    provider: Joi.string().allow(""),
    providerType: Joi.string().valid("educator", "institute"),
    providerId: Joi.string().allow(""),
    category: Joi.string().allow(""),
    subjects: Joi.array().items(Joi.string()),
    stage: Joi.string().allow(""),
    language: Joi.string().allow(""),
    price: Joi.number().min(0),
    originalPrice: Joi.number().min(0),
    duration: Joi.string().allow(""),
    lessons: Joi.number().integer().min(0),
    thumbnail: Joi.string().allow(""),
    featured: Joi.boolean(),
    tags: Joi.array().items(Joi.string()),
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

const applyCourse = {
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),

  body: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};
const objectId = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .messages({ "string.pattern.base": "{#label} must be a valid id" });

// schemas
const login = {
  body: Joi.object().keys({
    emailId: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    _id: objectId.required(),
  }),
};
export = {
  create,
  update,
  getById,
  deleteById,
  applyCourse,
  login,
  logout,
};
