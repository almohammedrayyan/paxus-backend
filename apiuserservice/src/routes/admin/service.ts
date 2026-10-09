/*************************************************
 * SmartMeet microservices - Admin
 * service.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// import plugins
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// import utils
import UserModel from "../../model/UserModel";
import { apiMessage } from "../../utils/apiMessage";
import StudentModel from "../../model/StudentModel";
import { onGenerateId } from "../../utils/helper";

// create
const create = async (body: any) => {
  if (!body.email) {
    throw new Error("Email is required");
  }

  const existingUser = await getByEmailId(body.email);

  if (existingUser) {
    throw new Error(apiMessage.emailExists);
  }

  const password = await bcrypt.hash(body.password, 10);

  const data = await UserModel.create({
    ...body,
    password,
  });

  return data;
};

// update
const update = async (_id: string, body: any) => {
  const data = await UserModel.findByIdAndUpdate(
    _id,
    { $set: body },
    { new: true, runValidators: true },
  ).select("-password");

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

// delete
const deleteById = async (_id: string) => {
  const data = await UserModel.findByIdAndDelete(_id).select("-password");

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

// get all
const getAll = async () => {
  const data = await UserModel.find().select("-password");

  return data;
};

// get by id
const getById = async (_id: string) => {
  const data = await UserModel.findById(_id).select("-password");

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

const getByEmailId = async (emailId: string) => {
  const data = await UserModel.findOne({ emailId });

  return data;
};

// exports
export = {
  create,
  update,
  deleteById,
  getAll,
  getById,
  getByEmailId,
};
