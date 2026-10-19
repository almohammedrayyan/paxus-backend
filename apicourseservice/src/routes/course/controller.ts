/*************************************************
 * SmartMeet microservices - Admin
 * controller.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import utils
import httpStatus from "http-status";
import { Request, Response } from "express";

// import utils
import service from "./service";
import { apiMessage } from "../../utils/apiMessage";
import { onSend_CatchResponse } from "../../utils/helper";

// controler functions
// create
const create = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const data = await service.create(body);

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res, error);
  }
};

// update
const update = async (req: Request, res: Response) => {
  try {
    const { _id, ...body } = req.body;

    const data = await service.update(_id, body);

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res, error);
  }
};

// get all
const getAll = async (req: Request, res: Response) => {
  try {
    const data = await service.getAll();

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res, error);
  }
};

// get by id
const getById = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id as string;
    const data = await service.getById(_id);

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res, error);
  }
};

// delete
const deleteById = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id as string;
    const data = await service.deleteById(_id);

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res, error);
  }
};

const applyCourse = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const _id = req.params.id as string;

    const data = await service.applyCourse(_id, body);

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res, error);
  }
};
// exports
export = {
  create,
  update,
  getAll,
  getById,
  deleteById,
  applyCourse,
};
// exports
