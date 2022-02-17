const express = require("express");
const {
  createOrder,
  getAllOrders,
} = require("../controllers/order.controller");
const router = express.Router();

router.get("/", getAllOrders);
router.post("/payment", createOrder);

module.exports = router;
