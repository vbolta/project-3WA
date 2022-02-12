const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
