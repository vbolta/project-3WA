const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  author: { type: Object, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
  product_id: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
