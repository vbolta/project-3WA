const express = require("express");
const {
  getAllArticles,
  addOneArticle,
  getOneArticle,
  userByPost,
  deleteArticle,
  updateArticle,
  getRandomArticles,
} = require("../controllers/article.controller");
const multer = require("multer");
const { validateToken } = require("../middlewares/auth.middleware");
const router = express.Router();

// To store image file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", getAllArticles);
router.get("/random", getRandomArticles);
router.get("/:id", getOneArticle);
router.post(
  "/createArticle",
  validateToken,
  upload.single("file"),
  addOneArticle
);
router.post("/:id/update", upload.single("file"), updateArticle);
router.post("/:id/delete", deleteArticle);
router.post("/post/populate/:id", userByPost);

module.exports = router;
