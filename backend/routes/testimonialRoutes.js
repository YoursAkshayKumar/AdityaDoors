const express = require('express');
const router = express.Router();
const {
  addTestimonial,
  addAllTestimonials,
  getAllTestimonials,
  getActiveTestimonials,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controller/testimonialController');

router.post('/add', addTestimonial);
router.post('/add-all', addAllTestimonials);
router.get('/all', getAllTestimonials);
router.get('/active', getActiveTestimonials);
router.get('/get/:id', getSingleTestimonial);
router.patch('/edit/:id', updateTestimonial);
router.delete('/delete/:id', deleteTestimonial);

module.exports = router;

