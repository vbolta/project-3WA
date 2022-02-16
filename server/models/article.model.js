const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = Schema({
  title: { type: String, default: "Test", required: true },
  author: {
    id: String,
    name: String,
    mail: String,
  },
  dateCreated: { type: Date },
  dateModified: Date,
  content: { type: String, required: true },
  picture: { type: String, required: true },

  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
