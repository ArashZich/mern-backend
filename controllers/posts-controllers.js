const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let posts = [
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

const createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Inputs", 422);
    // 422 => invalid value
  }
  const { title, description, creator } = req.body;
  const createdPost = {
    id: uuidv4(),
    title: title,
    description: description,
    creator: creator,
  };
  posts.push(createdPost);
  res.status(201).json({ post: createdPost });
  //201 => success and change value
};

const deletePost = (req, res, next) => {
  const postId = req.params.pid;
  posts = posts.filter((p) => p.id !== postId);
  res.status(200).json({ message: "Post Deleted!" });
};

exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
exports.createPost = createPost;
exports.deletePost = deletePost;
