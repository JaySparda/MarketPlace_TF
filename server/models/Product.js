const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  quantity: { type: Number },
  image: { type: String },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review", // References the Review model
    },
  ],
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", ProductSchema);
