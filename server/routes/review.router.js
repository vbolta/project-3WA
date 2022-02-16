const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  getReviewsByPost,
  addReview,
  deleteReview,
} = require("../controllers/review.controller");

router.get("/", getAllReviews);
router.get("/find/:id", getReviewsByPost);
router.post("/create", addReview);
router.post("/delete", deleteReview);

module.exports = router;
