const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isAuth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
require("dotenv").config();
const { SECRET_KEY } = process.env;

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let userFound = await User.findOne({ email, username });

    if (userFound) return res.status(400).json({ msg: "User already exists" });

    let salt = bcrypt.genSaltSync(12);
    let hashedPassword = bcrypt.hashSync(password, salt);

    let user = new User({ ...req.body, password: hashedPassword });
    user.save();
    return res.json({ msg: "Registered Successfully", user });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });

    if (!user) return res.status(400).json({ msg: "User doesn't exist" });

    let isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    let token = jwt.sign({ data: user }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //Set to true if its in production HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    return res.json({ token, user, msg: "Login Successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.get("/me", isAuth, (req, res) => {
  return res.json({ user: req.user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ msg: "Logged out" });
});

router.get("/admin/dashboard", isAuth, isAdmin, (req, res) => {
  res.json({ msg: "Welcome to admin dashboard" });
});

module.exports = router;
