const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // ✅ FIX HERE
    try {
      await sendEmail(email, name);
    } catch (err) {
      console.log("Email Error ❌", err.message);
    }

    res.json({
      message: "Register success"
    });

  } catch (error) {

  console.log("🔥 FULL ERROR:", error);
  console.log("🔥 MESSAGE:", error.message);
  console.log("🔥 STACK:", error.stack);

  res.status(500).json({
    message: error.message
  });

}
});
// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    res.json({
      message: "Login success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;