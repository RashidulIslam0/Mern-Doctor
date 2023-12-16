const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const SECRET_KEY = "MDRASHIDULISLAM";
// Created Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error signing up" });
  }
});

// Get Register
router.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({ message: "User Get successfully", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to get user" });
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1hr",
    });
    res
      .status(201)
      .json({ message: "User login successfully", user, data: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error signing up" });
  }
});

module.exports = router;
