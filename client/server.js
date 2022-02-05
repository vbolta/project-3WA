const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const users = require("./routes/user.router");
const articles = require("./routes/article.router");
const session = require("express-session");
const multer = require("multer");
const app = express();

mongoose.connect("mongodb://localhost:27017/test");
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,DELETE",
    credentials: true,
  })
);

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

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
