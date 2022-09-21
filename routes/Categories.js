const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const Cats = await Category.find();
    res.status(200).json(Cats);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
