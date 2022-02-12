const express = require("express");
const {
  getAllArticles,
  addOneArticle,
  getOneArticle,
  userByPost,
  deleteArticle,
} = require("../controllers/article.controller");
const multer = require("multer");
const { validateToken } = require("../middlewares/auth.middleware");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // cb(null, "test.jpg");
  },
});

const upload = multer({ storage: storage });

router.get("/", getAllArticles);
router.get("/:id", getOneArticle);
router.post(
  "/createArticle",
  validateToken,
  upload.single("file"),
  addOneArticle
);
router.post("/:id/delete", deleteArticle);
router.post("/post/populate/:id", userByPost);

module.exports = router;
