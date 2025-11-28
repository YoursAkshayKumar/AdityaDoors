const express = require("express");
const router = express.Router();
const {
  addInquiry,
  getAllInquiries,
  getSingleInquiry,
  updateInquiry,
  deleteInquiry,
} = require("../controller/inquiryController");

router.post("/add", addInquiry);
router.get("/all", getAllInquiries);
router.get("/get/:id", getSingleInquiry);
router.patch("/edit/:id", updateInquiry);
router.delete("/delete/:id", deleteInquiry);

module.exports = router;

