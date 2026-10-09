import Joi from "joi";
import { ROLE } from "../../utils/constant";

const create = {
  body: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
    role: Joi.string().valid(ROLE.student).required(),
    language: Joi.string().trim(),
    targetExam: Joi.string().trim(),
    stage: Joi.string().trim(),
    optionalSubject: Joi.string().trim(),
    enrolledCourses: Joi.array().items(Joi.string().trim()),
    completedTests: Joi.array().items(Joi.string().trim()),
    studyStreak: Joi.number().integer().min(0),
    overallScore: Joi.number().min(0),
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
