/*************************************************
 * SmartMeet microservices - Admin
 * service.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../../model/UserModel";

const getByEmailId = async (emailId: string) => {
  const data = await UserModel.findOne({
    emailId: emailId.toLocaleLowerCase(),
  });

  if (!data) {
    throw new Error("Email Id does not exits");
  }

  return data;
};

const getById = async (_id: string) => {
  const data = await UserModel.findById(_id);

  if (!data) {
    return;
  }

  return data;
};
export = { getByEmailId, getById };
