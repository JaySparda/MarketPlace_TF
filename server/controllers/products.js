const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const isAuth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

const fs = require("fs"); //filesystem - allows you to read and write on the files
const path = require("path"); //allows you to change directories
const multer = require("multer"); //handle your form with file upload

//this storage is a configuration on where to save it and formatting of the filename.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); //null is for any error
    //where to save the actual image
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
    //format the file name before storing
  },
});

const upload = multer({ storage });

router.post("/", isAuth, isAdmin, upload.single("image"), async (req, res) => {
  try {
    let product = new Product(req.body);
    if (req.file) product.image = req.file.filename;
    product.save();
    return res.json({ msg: "Product added successfully", product });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//Get all product
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    return res.json(products);
  } catch (e) {
    return res
      .status(400)
      .json({ error: e.message, msg: "Cannot get all products" });
  }
});

//get product by id
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (e) {
    return res
      .status(400)
      .json({ error: e.message, msg: "Cannot get this product" });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Cannot find the product" });
    }

    //delete the image of this product inside the public folder
    if (product.image) {
      const fileName = product.image;
      const filePath = path.join(__dirname, "../public/" + fileName);
      fs.unlinkSync(filePath);
    }
    let delproduct = await Product.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Product deleted", delproduct });
  } catch (e) {
    return res
      .status(400)
      .json({ error: e.message, msg: "Cannot delete this product" });
  }
});

router.put(
  "/:id",
  isAuth,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        //req.file - the admin is attaching a file on the form
        const fileName = product.image;
        const filePath = path.join(__dirname, "../public" + fileName);
        fs.unlinkSync(filePath);
      }
      let updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, image: req.file ? req.file.filename : product.image },
        { new: true }
      );
      return res.json({
        msg: "Product update successfully",
        product: updateProduct,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ error: e.message, msg: "Cannot edit the product" });
    }
  }
);

router.patch("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Couldn't find the product" });
    } else {
      await Product.findByIdAndUpdate(
        req.params.id,
        { $set: { isActive: !product.isActive } },
        { new: true }
      );
      return res.json({ msg: "Product status updated" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message, msg: "Cannot update status" });
  }
});

module.exports = router;
