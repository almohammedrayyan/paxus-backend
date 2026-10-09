/*************************************************
 * SmartMeet microservices - Admin
 * service.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

import CourseModel from "../../model/CourseModel";

// import model

// create
const create = async (body: any) => {
  const data = await CourseModel.create(body);

  return data;
};

// update
const update = async (_id: string, body: any) => {
  const data = await CourseModel.findByIdAndUpdate(
    _id,
    { $set: body },
    { new: true, runValidators: true },
  );

  if (!data) {
    throw new Error("Course not found");
  }

  return data;
};

// delete
const deleteById = async (_id: string) => {
  const data = await CourseModel.findByIdAndDelete(_id);

  if (!data) {
    throw new Error("Course not found");
  }

  return data;
};

// get all
const getAll = async () => {
  const data = await CourseModel.find();

  return data;
};

// get by id
const getById = async (_id: string) => {
  const data = await CourseModel.findById(_id);

  if (!data) {
    throw new Error("Course not found");
  }

  return data;
};

const applyCourse = async (_id: string, body: any) => {
  const { userId } = body;

  const data = await CourseModel.findByIdAndUpdate(
    _id,
    {
      $set: {
        paid: "yes",
      },
      $addToSet: {
        studentsEnrolled: userId,
      },
    },
    { new: true, runValidators: true },
  );

  if (!data) {
    throw new Error("Course not found");
  }

  return data;
};
// exports
export = {
  create,
  update,
  deleteById,
  getAll,
  getById,
  applyCourse,
};
