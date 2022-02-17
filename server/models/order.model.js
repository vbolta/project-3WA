const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
  totalPrice: { type: Number },
  customerMail: { type: String },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
