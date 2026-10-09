import InstituteModel from "../../model/InstituteModel";
import StudentModel from "../../model/StudentModel";
import { onGenerateId } from "../../utils/helper";

const createInstitueProfile = async (body: any) => {
  const lastStudent = await InstituteModel.findOne()
    .sort({ createdAt: -1 })
    .select("instituteId")
    .lean();

  const instituteId = onGenerateId(body.role, lastStudent?.instituteId);

  const data = await InstituteModel.create({
    ...body,
    instituteId,
  });

  return data;
};

const getById = async (userId: string) => {
  const data = await InstituteModel.findOne({ userId }).populate({
    path: "userId",
  });

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};
export = {
  createInstitueProfile,
  getById,
};
