const jwt = require("jsonwebtoken");
const secret = "abrar292";
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      role: user.role,
    },
    secret
  );
}
function getUser(token) {
  if (!token) return null;

  const decodedToken = jwt.verify(token, secret);
  return decodedToken;
}
function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("token in middleware", token);
  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, secret);
    console.log("Decoded user info:", decodedToken);

    // Attach user information to the request object
    req.user = decodedToken;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Token verification failed, Forbidden", error);
    return res.status(403).json({ status: false, message: "Forbidden" });
  }
  // getUser(token, (err, user) => {
  //   if (err) {
  //     return res.status(403).json({ status: false, message: "Forbidden" });
  //   }
  //   req.user = user;
  //   next();
  // });
}
module.exports = {
  setUser,
  getUser,
  authenticateToken,
};
