import mongoose from "mongoose";
import UserModel from "./UserModel";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel.modelName,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    language: {
      type: String,
    },
    targetExam: {
      type: String,
    },
    stage: {
      type: String,
    },
    optionalSubject: {
      type: String,
    },
    enrolledCourses: {
      type: [String],
      default: [],
    },
    completedTests: {
      type: [String],
      default: [],
    },
    studyStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

const StudentModel = mongoose.model("studentmodels", schema);

export default StudentModel;
