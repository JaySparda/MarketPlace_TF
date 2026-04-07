const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  rating: { type: Number },
  message: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
