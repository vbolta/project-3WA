const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const jwt = require("jsonwebtoken");

// const accessToken = req.header("accessToken");
// console.log(jwt.verify(accessToken, "secret"));

// Frame : Photo / dimension :["smallSize", "mediumSize", "tallSize"], price :{smallSize: 5, mediumSize: 8 , tallSize : 12}

const orderSchema = Schema({
  // price: { type: Number, enum: [5, 8, 12] },
  // madeAt: { type: Date },
  totalPrice: { type: Number },
  userAdress: { type: String },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
