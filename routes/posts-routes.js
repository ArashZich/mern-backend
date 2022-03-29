const express = require("express");

const router = express.Router();

const posts = [
  {
    id: "p1",
    title: "Post Title",
    description: "Post Description",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const postId = req.params.pid;
  const post = posts.find((p) => {
    return p.id === postId;
  });
  res.json({ post: post });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const post = posts.find((p) => p.creator === userId);

  res.json({ post: post });
});

module.exports = router;
