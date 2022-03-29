const HttpError = require("../models/http-error");

const posts = [
  {
    id: "p1",
    title: "Post Title",
    description: "Post Description",
    creator: "u1",
  },
];

const getPostById = (req, res, next) => {
  const postId = req.params.pid;
  const post = posts.find((p) => {
    return p.id === postId;
  });
  if (!post) {
    return next(new HttpError("Not Found!", 404));
  }
  res.json({ post: post });
};

const getPostByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const post = posts.find((p) => p.creator === userId);
  if (!post) {
    return next(new HttpError("Not Found!", 404));
  }

  res.json({ post: post });
};

exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
