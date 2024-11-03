const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    img: { type: String, require: true },
    title: { type: String, require: true },
    author: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true },
    shelf: { type: String, require: true },
    cost: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;