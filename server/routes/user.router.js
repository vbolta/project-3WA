const express = require("express");
const userList = require("../controllers/user.controller");
const router = express.Router();

router.get("/", userList.getAllUsers);

router.get("/one", userList.getActiveUser);

router.post("/user/find/post/:id", userList.postsByUser);

router.post("/register", userList.register);

router.post("/login", userList.login);

module.exports = router;
