const express = require("express");
const userList = require("../controllers/user.controller");
const router = express.Router();

const checkToken = (req, res, next) => {
  // console.log(req.headers);
  //   const header = req.headers["authorization"];
  //   if (typeof header !== "undefined") {
  //     const bearer = header.split(" ");
  //     const token = bearer[1];
  //     req.token = token;
  //     next();
  //   } else {
  //     //If header is undefined return Forbidden (403)
  //     res.sendStatus(403);
  //   }
};

router.get("/", userList.getAllUsers);

router.get("/one", userList.getActiveUser);

router.post("/user/find/post/:id", userList.postsByUser);

router.post("/register", userList.register);

router.post("/login", userList.login);

module.exports = router;
