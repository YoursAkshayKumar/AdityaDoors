const ApiError = require('../errors/api-error');
const Testimonial = require('../models/Testimonial');

module.exports.addTestimonial = async (req, res, next) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    await newTestimonial.save();
    res.status(200).json({ message: 'Testimonial added successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.addAllTestimonials = async (req, res) => {
  try {
    await Testimonial.deleteMany();
    const result = await Testimonial.insertMany(req.body);
    res.status(200).json({ message: 'Testimonials inserted successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllTestimonials = async (req, res, next) => {
  try {
    const result = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getActiveTestimonials = async (req, res, next) => {
  try {
    const result = await Testimonial.find({ status: "Show" }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getSingleTestimonial = async (req, res, next) => {
  try {
    const result = await Testimonial.findById(req.params.id);
    if (!result) {
      throw new ApiError(404, 'Testimonial not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.updateTestimonial = async (req, res, next) => {
  try {
    const isExist = await Testimonial.findOne({ _id: req.params.id });
    if (!isExist) {
      throw new ApiError(404, 'Testimonial not found !');
    }
    const result = await Testimonial.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json({ status: 'success', message: 'Testimonial update successfully', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTestimonial = async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Testimonial delete successfully' });
  } catch (error) {
    next(error);
  }
};

