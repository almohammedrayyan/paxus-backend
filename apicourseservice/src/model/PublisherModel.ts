import mongoose from "mongoose";
import UserModel from "./UserModel";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel.modelName,
      required: true,
    },
    publisherId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    publisherName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    booksCount: {
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

const PublisherModel = mongoose.model("publishermodels", schema);

export default PublisherModel;
