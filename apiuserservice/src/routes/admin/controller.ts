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

    const emailData = await service.getByEmailId(body.email);

    if (emailData) {
      return res.status(httpStatus.OK).send({
        message: apiMessage.emailDuplicate,
        success: false,
        data: null,
      });
    }

    const data = await service.create(body);

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res);
  }
};

// update
const update = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const _id = req.params.id as string;

    if (body.email) {
      const emailData = await service.getByEmailId(body.email);

      if (emailData && String(emailData._id) !== _id) {
        return res.status(httpStatus.OK).send({
          message: apiMessage.emailDuplicate,
          success: false,
          data: null,
        });
      }
    }

    const data = await service.update(_id, body);

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res);
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
    onSend_CatchResponse(res);
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
    onSend_CatchResponse(res);
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
    onSend_CatchResponse(res);
  }
};

// exports
export = {
  create,
  update,
  getAll,
  getById,
  deleteById,
};
// exports
