const jwt = require("jsonwebtoken");
const secret = "abrar292";
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
    },
    secret
  );
}
function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}
module.exports = {
  setUser,
  getUser,
};
