import mongoose from "mongoose";
import UserModel from "./UserModel";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel.modelName,
      required: true,
    },
    instituteId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    instituteName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    coursesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    studentsCount: {
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
  },
  { timestamps: true },
);

const InstituteModel = mongoose.model("institutemodels", schema);

export default InstituteModel;
