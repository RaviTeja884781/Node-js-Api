const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//?Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } //?this will give new user details after updating existing user.
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(401).json("you can update only your account");
  }
});

//?Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("user not found...");
    }
  } else {
    res.status(401).json("you can delete only your account");
  }
});

//? get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    //? when ever we fetch user we can see rest other
    //? details except password.
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
