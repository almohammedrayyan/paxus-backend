import EducatorModel from "../../model/EducatorModel";
import StudentModel from "../../model/StudentModel";
import { onGenerateId } from "../../utils/helper";

const createEducatorProfile = async (body: any) => {
  const lastStudent = await EducatorModel.findOne()
    .sort({ createdAt: -1 })
    .select("educatorId")
    .lean();

  const educatorId = onGenerateId(body.role, lastStudent?.educatorId);

  const data = await EducatorModel.create({
    ...body,
    educatorId,
  });

  return data;
};

const getById = async (userId: string) => {
  const data = await EducatorModel.findOne({ userId }).populate({
    path: "userId",
  });

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

const updateEducatorProfile = async (
  userId: string,
  body: { bio?: string; specializations?: string[]; experience?: number },
) => {
  const data = await EducatorModel.findOneAndUpdate(
    { userId },
    { $set: body },
    { new: true, runValidators: true },
  ).populate({ path: "userId" });

  if (!data) {
    throw new Error("Educator profile not found");
  }

  return data;
};

export = {
  createEducatorProfile,
  getById,
  updateEducatorProfile,
};
