require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const cors = require("cors");
const users = require("./routes/user.router");
const articles = require("./routes/article.router");
const reviews = require("./routes/review.router");
const orders = require("./routes/order.router");

// const session = require("express-session");
// const multer = require("multer");
const app = express();

// Variables d'environnement
const hostname = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test");
app.use(express.json());
app.use(
  cors({
    origin: [`${process.env.CLIENT_URL}`],
    methods: "GET,POST,DELETE",
    credentials: true,
  })
);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.use("/users", users);
app.use("/articles", articles);
app.use("/reviews", reviews);
app.use("/orders", orders);

app.use(express.static(__dirname));

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
