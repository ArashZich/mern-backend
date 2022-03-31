const express = require("express");
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

//! after app
app.use(bodyParser.json());
//! before routes

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Not Found!", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSet) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Error" });
});

app.listen(5000);
