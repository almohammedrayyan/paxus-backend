/*************************************************
 * SmartMeet microservices - Admin
 * controller.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import utils
import httpStatus from "http-status";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

// import utils
import service from "./service";
import { apiMessage } from "../../utils/apiMessage";
import { onSend_CatchResponse } from "../../utils/helper";
import {
  onGenerate_AuthTokens,
  onRemove_AuthTokens,
} from "../../utils/apiToken";

// controler functions
// create
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await service.getByEmailId(email);

    if (!data?._id) {
      return res.status(httpStatus.ACCEPTED).send({
        message: apiMessage.existNotEmail,
        success: false,
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, data.password ?? "");

    if (!isMatch) {
      return res.status(httpStatus.ACCEPTED).send({
        message: apiMessage.invalidPassword,
        success: false,
        data: null,
      });
    }

    if (!data.isActive) {
      return res.status(httpStatus.ACCEPTED).send({
        message: apiMessage.inActiveUser,
        success: false,
        data: null,
      });
    }

    const tokenData = await onGenerate_AuthTokens(data.email);

    return res.status(httpStatus.ACCEPTED).send({
      message: apiMessage.success,
      success: true,
      data: {
        data: data.toObject(),
        tokenData,
      },
    });
  } catch (error) {
    onSend_CatchResponse(res);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    const data = await service.getById(_id);

    if (data?.email) {
      await onRemove_AuthTokens(data.email);
    }

    return res.status(httpStatus.OK).send({
      message: apiMessage.success,
      success: true,
      data: null,
    });
  } catch (error) {
    onSend_CatchResponse(res);
  }
};
// exports
export = {
  login,
  logout,
};
// exports
