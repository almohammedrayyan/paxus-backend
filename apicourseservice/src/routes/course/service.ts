/*************************************************
 * SmartMeet microservices - Admin
 * service.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

import CourseModel from "../../model/CourseModel";
import EducatorModel from "../../model/EducatorModel";
import InstituteModel from "../../model/InstituteModel";
import httpStatus from "http-status";
import ApiError from "../../utils/apiError";

// import model

// create
const create = async (body: any) => {
  const { providerType, providerId } = body;

  if (!providerId) {
    throw new Error("Provider ID is required");
  }

  let providerName: string;

  // Get the provider name based on provider type
  if (providerType === "institute") {
    const institute = await InstituteModel.findOne({ userId: providerId });

    if (!institute) {
      throw new Error("Institute not found");
    }

    providerName = institute.instituteName;
  } else if (providerType === "educator") {
    const educator = await EducatorModel.findOne({
      userId: providerId,
    }).populate("userId");

    if (!educator) {
      throw new Error("Educator not found");
    }

    const user = educator.userId as any;

    providerName = [user?.firstName, user?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    if (!providerName) {
      throw new Error("Educator name not found");
    }
  } else {
    throw new Error("Provider type must be institute or educator");
  }

  // Find the highest existing course number
  const lastCourse = await CourseModel.aggregate([
    { $match: { courseId: /^crs-\d+$/ } },
    {
      $set: {
        courseNumber: {
          $toInt: {
            $arrayElemAt: [{ $split: ["$courseId", "-"] }, 1],
          },
        },
      },
    },
    { $sort: { courseNumber: -1 } },
    { $limit: 1 },
  ]);

  const nextNumber = (lastCourse[0]?.courseNumber ?? 0) + 1;
  const courseId = `crs-${String(nextNumber).padStart(2, "0")}`;

  // Create course with generated ID and provider details
  const course = await CourseModel.create({
    ...body,
    courseId,
    providerType,
    providerId,
    provider: providerName,
  });

  return course;
};

// update
const update = async (_id: string, body: any) => {
  if (body.price !== undefined) {
    const existingCourse = await CourseModel.findById(_id).select(
      "studentsEnrolled",
    );

    if (!existingCourse) {
      throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
    }

    body.totalRevenue =
      existingCourse.studentsEnrolled.length * (Number(body.price) || 0);
  }

  const data = await CourseModel.findByIdAndUpdate(
    _id,
    { $set: body },
    { new: true, runValidators: true },
  );

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
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
  const courses = await CourseModel.find();
  const data = courses.map((course: any) => {
    const totalRevenue =
      (Array.isArray(course.studentsEnrolled)
        ? course.studentsEnrolled.length
        : 0) * (Number(course.price) || 0);

    return {
      ...course.toObject(),
      totalRevenue,
    };
  });

  const totalRevenue = data.reduce(
    (sum: number, course: { totalRevenue: number }) =>
      sum + course.totalRevenue,
    0,
  );

  return { courses: data, totalRevenue };
};

// get by id
const getById = async (_id: string) => {
  const data = await CourseModel.findById(_id);

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }

  return data;
};

const applyCourse = async (_id: string, body: { userId: string }) => {
  const { userId } = body;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const existingCourse = await CourseModel.findById(_id);

  if (!existingCourse) {
    throw new Error("Course not found");
  }

  const coursePrice = Number(existingCourse.price) || 0;
  const isAlreadyEnrolled = existingCourse.studentsEnrolled.some(
    (studentId: any) => studentId.toString() === userId,
  );
  // Revenue is derived from the enrolled list, which also repairs older
  // documents that did not have totalRevenue when they were first created.
  const enrolledCount =
    existingCourse.studentsEnrolled.length + (isAlreadyEnrolled ? 0 : 1);
  const course = await CourseModel.findByIdAndUpdate(
    _id,
    {
      $addToSet: {
        studentsEnrolled: userId,
      },
      $set: { totalRevenue: enrolledCount * coursePrice },
    },
    { new: true, runValidators: true },
  );

  if (!course) {
    throw new Error("Course not found");
  }

  const studentsCount = course.studentsEnrolled.length;

  if (course.providerType === "institute") {
    await InstituteModel.findByIdAndUpdate(course.providerId, {
      $addToSet: { studentsCount },
    });
  } else if (course.providerType === "educator") {
    await EducatorModel.findByIdAndUpdate(course.providerId, {
      $addToSet: { studentsCount },
    });
  } else {
    throw new Error("Invalid course provider type");
  }

  return course;
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
