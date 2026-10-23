const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    courseId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    provider: { type: String },
    providerType: { type: String, enum: ["educator", "institute"] },
    providerId: { type: String },
    category: { type: String },
    subjects: [{ type: String }],
    stage: { type: String },
    language: { type: String },
    price: { type: Number },
    originalPrice: { type: Number },

    // reviews and ratings
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },

    // enrolled students as user references
    studentsEnrolled: [
      { type: mongoose.Schema.Types.ObjectId, ref: "usermodels" },
    ],
    totalRevenue: { type: Number, default: 0, min: 0 },

    duration: { type: String },
    lessons: { type: Number },
    thumbnail: { type: String },
    featured: { type: Boolean, default: true },
    tags: [{ type: String }],
    status: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: String,
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

const CourseModel = mongoose.model("courseModel", schema);

// export
export default CourseModel;
