import StudentModel from "../../model/StudentModel";
import { onGenerateId } from "../../utils/helper";

const createStudentProfile = async (body: any) => {
  const lastStudent = await StudentModel.findOne()
    .sort({ createdAt: -1 })
    .select("studentId")
    .lean();

  const studentId = onGenerateId(body.role, lastStudent?.studentId);

  const data = await StudentModel.create({
    ...body,
    studentId,
  });

  return data;
};

const getById = async (userId: string) => {
  const data = await StudentModel.findOne({ userId }).populate({
    path: "userId",
  });

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};
export = {
  createStudentProfile,
  getById,
};
