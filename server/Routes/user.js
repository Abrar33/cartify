const express = require("express");
const jwt = require("jsonwebtoken");
const { postCartItem } = require("../Controller/cart");
// const { postCartItem } = require("../Controller/cart");
const {
  handleUserSignUp,
  handleUserSignIn,
  handleGetUser,
} = require("../Controller/user");
const { authenticateToken } = require("../services/auth");

const router = express.Router();
router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);
router.get("/all", handleGetUser);
// function authenticateToken(req, res, next) {
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
//   console.log("token in middleware", token);
//   if (!token) {
//     return res.status(401).json({ status: false, message: "Unauthorized" });
//   }
//   try {
//     const decodedToken = jwt.verify(token, secret);
//     console.log("Decoded user info:", decodedToken);

//     // Attach user information to the request object
//     req.user = decodedToken;

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.log("Token verification failed, Forbidden", error);
//     return res.status(403).json({ status: false, message: "Forbidden" });
//   }
//   // getUser(token, (err, user) => {
//   //   if (err) {
//   //     return res.status(403).json({ status: false, message: "Forbidden" });
//   //   }
//   //   req.user = user;
//   //   next();
//   // });
// }
router.post("/check-token", authenticateToken, (req, res) => {
  // If the token is valid, send user information in the response
  res.json({ status: true, user: req.user });
});

module.exports = router;
