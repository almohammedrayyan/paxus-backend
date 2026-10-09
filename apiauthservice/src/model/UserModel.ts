import mongoose from "mongoose";
import { ROLE } from "../utils/constant";

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: {
      currentTime: () => {
        let date = new Date();
        let newDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60 * 1000 * -1,
        );
        return newDate;
      },
    },
  },
);

// model
const UserModel = mongoose.model("usermodels", schema);

// export
export default UserModel;
