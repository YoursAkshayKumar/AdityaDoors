const ApiError = require("../errors/api-error");
const Inquiry = require("../models/Inquiry");

module.exports.addInquiry = async (req, res, next) => {
  try {
    const inquiryData = req.body;

    const inquiry = new Inquiry(inquiryData);
    await inquiry.save();

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      result: inquiry,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.getAllInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      result: inquiries,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.getSingleInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return next(new ApiError(404, "Inquiry not found"));
    }

    res.status(200).json({
      success: true,
      result: inquiry,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.updateInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!inquiry) {
      return next(new ApiError(404, "Inquiry not found"));
    }

    res.status(200).json({
      success: true,
      message: "Inquiry updated successfully",
      result: inquiry,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return next(new ApiError(404, "Inquiry not found"));
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

