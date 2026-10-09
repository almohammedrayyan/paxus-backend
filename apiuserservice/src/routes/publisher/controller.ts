import { apiMessage } from "../../utils/apiMessage";
import service from "./service";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { onSend_CatchResponse } from "../../utils/helper";
const createPublisherProfile = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const data = await service.createPublisherProfile(body);

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const userId = req.params._id as string;
    const data = await service.getById(userId);

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data,
    });
  } catch (error) {
    onSend_CatchResponse(res);
  }
};
export = {
  createPublisherProfile,
  getById,
};
