const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  filetype: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Media", mediaSchema);