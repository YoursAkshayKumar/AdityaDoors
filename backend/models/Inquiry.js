const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    inquiryType: {
      type: String,
      enum: ["general", "pricing", "availability", "installation", "customization", "warranty"],
      default: "general",
    },
    product: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      originalPrice: {
        type: Number,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "resolved", "closed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
module.exports = Inquiry;

