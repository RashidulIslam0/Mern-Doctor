const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ message: "User already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Respond with success message and the created user data
    res.status(201).json({
      message: "User Created Successfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating Hotel:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Extract user credentials from the request body
    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await User.findOne(email);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await User.findOne(password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .json({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
