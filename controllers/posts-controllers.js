const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Post = require("../models/post");

let posts = [
  {
    id: "p1",
    title: "Post Title",
    description: "Post Description",
    creator: "u1",
  },
];

// const getPostById = (req, res, next) => {
//   const postId = req.params.pid;
//   const post = posts.find((p) => {
//     return p.id === postId;
//   });
//   if (!post) {
//     return next(new HttpError("Not Found!", 404));
//   }
//   res.json({ post: post });
// };

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

const getPostByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const post = posts.find((p) => p.creator === userId);
  if (!post) {
    return next(new HttpError("Not Found!", 404));
  }

  res.json({ post: post });
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

const deletePost = (req, res, next) => {
  const postId = req.params.pid;
  posts = posts.filter((p) => p.id !== postId);
  res.status(200).json({ message: "Post Deleted!" });
};

exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
exports.createPost = createPost;
exports.deletePost = deletePost;
