const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    quote: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Show", "Hide"],
      default: "Show",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial;

