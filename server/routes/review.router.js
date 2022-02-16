const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getReviewsByPost,
  addReview,
  deleteReview,
  updateReview,
} = require("../controllers/review.controller");

router.get("/", getAllReviews);
router.get("/find/:id", getReviewsByPost);
router.post("/create", addReview);
router.post("/update", updateReview);
router.post("/delete", deleteReview);

module.exports = router;
