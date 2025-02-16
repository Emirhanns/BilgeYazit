const Product = require("../models/ProductModel.js");
const express = require("express");
const router = express.Router();

//! get all Product
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

//! create
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! update
//! update
router.put("/update-product", async (req, res) => {
  try {
    const { productId, stock, ...otherFields } = req.body; // Diğer alanları ayır
    await Product.findOneAndUpdate(
      { _id: productId },
      { ...otherFields, stock }, // Diğer alanları ve stok güncelle
    );
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    console.log(error);
  }
});


//! delete
router.delete("/delete-product", async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    console.log(error);
  }
});







module.exports = router;