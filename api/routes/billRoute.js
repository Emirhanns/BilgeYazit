const Bill = require("../models/BillModel.js");
const Product = require("../models/ProductModel"); // Ürün modelini ekleyelim
const express = require("express");
const router = express.Router();

//! get all Bill
router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    console.log(error);
  }
});

//! create bill and update stock
router.post("/add-bill", async (req, res) => {
  const session = await Bill.startSession();
  session.startTransaction();

  try {
    const newBill = new Bill(req.body);
    await newBill.save({ session });

    // Stok güncelleme işlemi
    const cartItems = req.body.cartItems;

    for (let item of cartItems) {
      // Satın alınan ürünlerin stoklarını azalt
      await Product.findByIdAndUpdate(
        item._id,
        { $inc: { stock: -item.quantity } }, // Satın alınan miktarı stokken düş
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json("Fatura başarıyla oluşturuldu ve stoklar güncellendi.");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json("Fatura oluşturulurken hata oluştu.");
    console.log(error);
  }
});

module.exports = router;
