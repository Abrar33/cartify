const express = require("express");
const {
  handleUserSignUp,
  handleUserSignIn,
  handleGetUser,
} = require("../Controller/user");
const { getUser } = require("../services/auth");

const router = express.Router();
router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);
router.get("/all", handleGetUser);
function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  getUser(token, (err, user) => {
    if (err) {
      return res.status(403).json({ status: false, message: "Forbidden" });
    }

    req.user = user;
    next();
  });
}
router.post("/check-token", authenticateToken, (req, res) => {
  // If the token is valid, send user information in the response
  res.json({ status: true, user: req.user });
});
module.exports = router;
