const Order = require("../models/order.model");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// Using strip to make paiments

module.exports = class OrderController {
  static getAllOrders(req, res) {
    Order.find().then(function (orders) {
      res.send(orders);
    });
  }
  static async createOrder(req, res) {
    const products = req.body.products;
    const token = req.body.token;
    let totalPrice = 0;
    let productNames = [];

    products.forEach((product) => {
      totalPrice += product.price;
      productNames.push(product.name);
    });
    // Cleaning up message descritipn
    const description = productNames.toString().replace(",", ", ");

    Order.create({
      totalPrice: totalPrice * 100, // to get price
      customerMail: token.email,
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));

    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create({
          amount: totalPrice * 100,
          currency: "eur",
          customer: customer.id,
          description: description,
        });
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  }
};
