const express = require("express");

const postsRoutes = require("./routes/posts-routes");

const app = express();

app.use("/api/posts", postsRoutes);

app.listen(5000);
