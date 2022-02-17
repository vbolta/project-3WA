const express = require("express");
const {
  getAllUsers,
  getActiveUser,
  postsByUser,
  register,
  login,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/one", getActiveUser);
router.post("/user/find/post/:id", postsByUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
