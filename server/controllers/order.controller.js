const order = require("../models/order.model");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

module.exports = class OrderController {
  static async createOrder(req, res) {
    console.log(req.body);
    const product = req.body.product;
    const token = req.body.token;
    // //const isdempotencyKey = uuid();
    //test
    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create({
          amount: product.price * 100,
          currency: "eur",
          customer: customer.id,
          description: product.name,
        });
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  }
  //  try{
  //    const session = await stripe.checkout.sessions.create({
  //     payment_method_types : ['card'],
  //     line_items :req.body.items.map(item =>{
  //       const storeItem
  //     }),
  //     mode:'payment',
  //     success_url: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/checkout_success`,
  //     cancel_url: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/checkout_cancel`
  //    })
  //    res.json({url:session.url})
  //  }catch(e){
  //    res.status(500).json({error: e.message})
  //  }
  // }
};
