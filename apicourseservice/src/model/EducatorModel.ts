import mongoose from "mongoose";
import UserModel from "./UserModel";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel.modelName,
      required: true,
    },
    educatorId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
    },
    specializations: {
      type: [String],
      default: [],
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    studentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    coursesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const EducatorModel = mongoose.model("educatormodels", schema);

export default EducatorModel;
