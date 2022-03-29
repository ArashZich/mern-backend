const express = require("express");
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts-routes");

const app = express();

//! after app
app.use(bodyParser.json());
//! before routes

app.use("/api/posts", postsRoutes);

app.use((error, req, res, next) => {
  if (res.headerSet) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Error" });
});

app.listen(5000);
