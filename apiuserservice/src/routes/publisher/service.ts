import PublisherModel from "../../model/PublisherModel";
import StudentModel from "../../model/StudentModel";
import { onGenerateId } from "../../utils/helper";

const createPublisherProfile = async (body: any) => {
  const lastStudent = await PublisherModel.findOne()
    .sort({ createdAt: -1 })
    .select("studentId")
    .lean();

  const publisherId = onGenerateId(body.role, lastStudent?.publisherId);

  const data = await PublisherModel.create({
    ...body,
    publisherId,
  });

  return data;
};

export = {
  createPublisherProfile,
};
