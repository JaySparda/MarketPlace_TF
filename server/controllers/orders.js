const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const isAuth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

//Get all orders by the user
router.get("/", isAuth, async (req, res) => {
  try {
    let orders = await Order.find({ user: req.user._id }).populate({
      path: "items.product",
      select: "name price image",
    });
    return res.json(orders);
  } catch (e) {
    return res
      .status(400)
      .json({ error: e.message, msg: "Couldn't get orders" });
  }
});

//get all orders by the admin
//localhost:8888/orders/all
router.get("/all", isAuth, isAdmin, async (req, res) => {
  try {
    let orders = await Order.find()
      .populate({
        path: "items.product",
        select: "name price image",
      })
      .populate({
        path: "user",
        select: "username email",
      });
    return res.json(orders);
  } catch (e) {
    return res
      .status(400)
      .json({ error: e.message, msg: "Couldn't get orders" });
  }
});

router.post("/", isAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) return res.status(400).json({ msg: "No Cart found" });

    cart.items.map(async (item) => {
      let product = await Product.findById(item.product);
      product.quantity = parseInt(product.quantity) - parseInt(item.quantity);
      await product.save();
    });
    let myOrder = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => {
        return {
          ...item,
          subtotal: parseInt(item.quantity) * parseFloat(item.product.price),
        };
      }),
      //   total:
    });
    await Cart.findByIdAndDelete(cart._id);
    return res.json({ msg: "Checkout Successfully", order: myOrder });
  } catch (e) {
    res.status(400).json({ error: e.message, msg: "Cannot create an order" });
  }
});

module.exports = router;
