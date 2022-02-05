const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/test");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mail: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
