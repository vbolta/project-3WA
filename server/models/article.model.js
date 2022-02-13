const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = Schema({
  title: { type: String, default: "Test", required: true },
  author: {
    id: String,
    name: String,
    mail: String,
  },
  dateCreated: { type: Date, default: Date.now },
  dateModified: Date,
  content: { type: String, required: true },
  picture: String,
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
