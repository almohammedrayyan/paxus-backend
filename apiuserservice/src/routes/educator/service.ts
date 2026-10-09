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

export = {
  createEducatorProfile,
};
