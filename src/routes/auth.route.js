const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "New user registered sucessfully" });
  } catch (err) {
    res.send(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid user password!" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, password: user.password },
      process.env.SECRET_KEY  
    );
    res.json({ token });
  } catch (err) {
    res.send(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
