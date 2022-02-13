const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  addReview,
} = require("../controllers/review.controller");

router.get("/", getAllReviews);
router.post("/create", addReview);

module.exports = router;
