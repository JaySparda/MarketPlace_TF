const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const isAuth = require("../middleware/auth");

//Add to cart = localhost:8888/carts
router.post("/", isAuth, async (req, res) => {
  try {
    const { quantity, productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product doesn't exist" });

    if (quantity > product.quantity)
      return res.status(400).json({ msg: "Cannot exceed available quantity" });
    const cart = await Cart.findOne({ user: req.user._id });

    //if cart is empty (its your first time adding on the cart (empty basket))
    if (cart === null) {
      const myCart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity: quantity }],
      });

      return res.json({
        msg: "Product added to cart successfully",
        cart: myCart,
      });
    }

    if (cart) {
      //If the cart is not empty
      const foundItem = cart.items.find(
        (item) => item.product._id.toString() === productId
      );
      if (foundItem) {
        //user is added the same item to increase the quantity
        foundItem.quantity = parseInt(foundItem.quantity) + parseInt(quantity);
        if (foundItem.quantity > product.quantity)
          return res
            .status(400)
            .json({ msg: "Cannot exceed available quantity" });
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
      return res.json({ msg: "Added to cart successfully" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong adding to cart..." });
  }
});

//get cart
router.get("/", isAuth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    return res.json(cart);
  } catch (e) {
    return res
      .status(400)
      .json({ error: e.message, msg: "Cannot get your cart" });
  }
});

//delete everything or empty cart
router.delete("/", isAuth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ msg: "You don't have a cart to empty" });
    } else await Cart.findOneAndDelete({ user: req.user._id });
    return res.json({ msg: "Cart is Empty" });
  } catch (e) {
    res.status(400).json({ error: e.message, msg: "Couldn't empty the cart" });
  }
});

//delete a specific item inside the cart -> delete localhost:8888/carts/12
//Pass the product id after the carts/productId
router.delete("/:id", isAuth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ "items.product": req.params.id });
    if (!cart) {
      return res.status(404).json({ msg: "product is not in the cart" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.id
    );

    if (cart.items.length) {
      await cart.save();
      return res.json({ msg: "product has been remove", cart });
    } else {
      await Cart.findOneAndDelete({ user: req.user._id });
      return res.json({ msg: "Cart is now Empty" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Couldn't delete the product in the cart" });
  }
});

//update the quantity of the product
router.put("/", isAuth, async (req, res) => {
  try {
    let { quantity, productId } = req.body;
    if (quantity < 1)
      return res.status(400).json({ msg: "quantity must be atleast 1" });
    let cart = await Cart.findOne({
      user: req.user._id,
    });
    let product = await Product.findById(productId);

    const foundItem = cart.items.find(
      (item) => item.product._id.toString() === productId
    );

    if (foundItem) {
      foundItem.quantity = parseInt(quantity);

      if (foundItem.quantity > product.quantity) {
        return res
          .status(400)
          .json({ msg: "Cannot exceed available quantity" });
      }
    }
    cart.save();

    return res.json({ msg: "quantity has been update", quantity });
  } catch (e) {
    res.status(400).json({
      error: e.message,
      msg: "Couldn't update the quantity of the product",
    });
  }
});

module.exports = router;
