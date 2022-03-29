const express = require("express");
const postControllers = require("../controllers/posts-controllers");

const router = express.Router();

router.get("/:pid", postControllers.getPostById);

router.get("/user/:uid", postControllers.getPostByUserId);

module.exports = router;
