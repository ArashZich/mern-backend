const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let users = [
  {
    id: "u1",
    name: "Arash",
    email: "arashzich1992@gmail.com",
    password: "12345",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: users });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Inputs", 422);
  }
  const { name, email, password } = req.body;
  const createdUser = {
    id: uuidv4(),
    name: name,
    email: email,
    password: password,
  };

  users.push(createdUser);
  res.status(201).json({ users: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const validUser = users.find((user) => user.email === email);
  if (!validUser || validUser.password !== password) {
    throw new HttpError("Not a Valid User!", 401);
  }
  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
