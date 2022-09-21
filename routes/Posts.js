const express = require("express");
const router = express.Router();
// const User = require("../models/User");
const Post = require("../models/Post");

//?Create Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//? Update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(500).json(error.message);
      }
    } else {
      res.status(401).json("you can update only your post only!");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//?Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();

        res.status(200).json("post has been deleted...");
      } catch (error) {
        res.status(500).json(error.message);
      }
    } else {
      res.status(401).json("you can delete only your post only!");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//? get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//? all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        category: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
