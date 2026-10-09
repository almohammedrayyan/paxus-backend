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

export = {
  createInstitueProfile,
};
