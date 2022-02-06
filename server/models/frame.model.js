const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const jwt = require("jsonwebtoken");

// const accessToken = req.header("accessToken");
// console.log(jwt.verify(accessToken, "secret"));

// Frame : Photo / dimension :["smallSize", "mediumSize", "tallSize"], price :{smallSize: 5, mediumSize: 8 , tallSize : 12}

const frameSchema = Schema({
  photo: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  dimension: { type: String }, // , enum: ["smallSize", "mediumSize", "tallSize"]
  price: { type: Number, enum: [5, 8, 12] },
});

const Frame = mongoose.model("Frame", frameSchema);

module.exports = Frame;
