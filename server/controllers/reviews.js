const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");

//add review
router.post("/", isAuth, async (req, res) => {
  try {
    const { productId, rating, message, userId } = req.body;
    // const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ msg: "Rating must be between 1-5" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const hasPurchased = await Order.exists({
      user: userId,
      "items.product": productId,
      purchased_date: { $exists: true },
    });

    if (!hasPurchased) {
      return res
        .status(403)
        .json({ msg: "You can only review on purchased product" });
    }

    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        msg: "You've already reviewed this product",
      });
    }

    const review = new Review({
      rating,
      message,
      product: productId,
      user: userId,
    });

    await review.save();

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id },
    });
    return res.json({ msg: "Review added successfully", review });
  } catch (e) {
    return res
      .status(400)
      .json({ msg: "Fail to add the review", error: e.message });
  }
});

//get all the review
router.get("/", async (req, res) => {
  try {
    let review = await Review.find().populate("product").populate({
      path: "user",
      select: "username email",
    });
    return res.json(review);
  } catch (e) {
    return res.json(e);
  }
});

//delete review by id
router.delete("/:id", isAuth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.json({ msg: "Could not find the review" });
    } else {
      await Review.findByIdAndDelete(req.params.id);
      return res.json({ msg: "review deleted successfully", review });
    }
  } catch (e) {
    return res.json(e);
  }
});

//update review by id
router.put("/:id", isAuth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.json({ msg: "Could not find the review" });
    } else {
      let updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            //$set -> for update multiple fields
            rating: req.body.rating,
            message: req.body.message,
          },
        },
        { new: true }
      );
      return res.json({
        msg: "Review updated successfully",
        review: updatedReview,
      });
    }
  } catch (e) {
    return res.json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
