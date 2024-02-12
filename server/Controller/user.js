const { v4: uuid } = require("uuid");
const User = require("../Model/user");
const { setUser } = require("../services/auth");
const jwt = require("jsonwebtoken");
async function handleUserSignUp(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  res.json({ status: "OK", msg: "user created" });
  // res.redirect("/");
}
async function handleUserSignIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, password: password });

  if (!user) {
    return res
      .status(401)
      .json({ status: false, message: "invalid credentials" });
  }
  const token = setUser(user);
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // Set httpOnly and maxAge (optional) for security

  return res.json({ status: true, message: "sucessful", user, token });
}
async function handleGetUser(req, res) {
  const users = await User.find();
  res.status(200).json(users);
  res.redirect("/");
}

module.exports = {
  handleUserSignIn,
  handleUserSignUp,
  handleGetUser,
};
