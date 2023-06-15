const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/User.model");

const signRouter = express.Router();

signRouter.post("/", async (req, res) => {
  const { userName, avatar, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = new UserModel({
      userName,
      avatar,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to register user." });
  }
  
});

module.exports = {
  signRouter,
};