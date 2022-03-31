const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Post = require("../models/post");

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError("Could not find a post", 500);
    return next(error);
  }
  if (!post) {
    const error = new HttpError("Could not find a post", 500);
    return next(error);
  }
  res.json({ post: post.toObject({ getters: true }) });
  //getters: true => {_id => id}
};

const getPostByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let posts;
  try {
    posts = await Post.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Could not find a post", 500);
    return next(error);
  }
  if (!posts) {
    const error = new HttpError("Could not find a post", 500);
    return next(error);
  }

  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Inputs", 422);
    // 422 => invalid value
  }
  const { title, description, creator } = req.body;
  const createdPost = new Post({
    title: title,
    description: description,
    image: "url",
    creator: creator,
    // id: uuidv4(),
  });

  try {
    await createdPost.save();
  } catch (err) {
    const error = new HttpError("Creating Post Failed!", 500);
    return next(error);
  }

  res.status(201).json({ post: createdPost });
  //201 => success and change value
};

const deletePost = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError("Could not delete a post", 500);
    return next(error);
  }

  try {
    await post.remove();
  } catch (err) {
    const error = new HttpError("Could not delete a post", 500);
    return next(error);
  }
  res.json({ message: "Post Deleted!" });
};

exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
exports.createPost = createPost;
exports.deletePost = deletePost;
