require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const cors = require("cors");
const users = require("./routes/user.router");
const articles = require("./routes/article.router");
// const session = require("express-session");
// const multer = require("multer");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test");
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,DELETE",
    credentials: true,
  })
);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

/** A ajouter
 *
 * Frame : Photo / dimension :["smallSize", "mediumSize", "tallSize"], price :{smallSize: 5, mediumSize: 8 , tallSize : 12}
 *
 * Order : madeAt: Data, totalPrice: Number, userAdress : String, paiement: boolean default false
 *
 *
 * */

// app.use(
//   session({
//     key: "userId",
//     secret: "HELLO-CODE",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

const hostname = "localhost";
const PORT = 3001;

// const qcmSchema = new mongoose.Schema({
//   userId: Number,
//   answer: String,
// });

app.use("/users", users);
app.use("/articles", articles);
app.use(express.static(__dirname));
app.post("/checkout", async (req, res) => {
  console.log("test");
  // try {
  //   const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ["card"],
  //     mode: "payment",
  //     line_items: req.body.items.map((item) => {
  //       const storeItem = storeItems.get(item.id);
  //       return {
  //         price_date:{
  //           currency: 'eur',
  //           orid
  //         },
  //         quantity
  //       }
  //     }),
  //     success_url: `${process.env.SERVER_URL}/success.html`,
  //     cancel_url: `${process.env.SERVER_URL}/cancel.html`,
  //   });
  //   res.json({ url: session.url });
  // } catch (e) {
  //   res.status(500).json({ error: e.message });
  // }
});

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
