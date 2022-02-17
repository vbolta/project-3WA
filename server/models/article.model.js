const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = Schema({
  title: { type: String, required: true },
  author: {
    id: String,
    name: String,
    mail: String,
  },
  dateCreated: { type: Date, defaut: Date.now() },
  dateModified: Date,
  content: { type: String, required: true },
  picture: { type: String, required: true },
  price: { type: Number, default: 12 },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
