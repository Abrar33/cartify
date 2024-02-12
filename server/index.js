const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
//Routes
const products = require("./Routes/product");
const usersRouter = require("./Routes/user");
const company = require("./Routes/company");
const { urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const { getUser } = require("./services/auth");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
connectDB();

app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    //optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(cookieParser());

// function authenticateToken(req, res, next) {
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ status: false, message: "Unauthorized" });
//   }

//   getUser(token, secret, (err, user) => {
//     if (err) {
//       return res.status(403).json({ status: false, message: "Forbidden" });
//     }

//     req.user = user;
//     next();
//   });
// }
app.use("/uploads", express.static("uploads"));
app.use("/api/v1", products);
app.use("/auth", usersRouter);
app.use("/company", company);
console.log("hello", process.env.PORT);
app.get("/message", (req, res) => {
  // Your logic to fetch or generate data
  const data = { message: "Hello from Node.js!", info: "second detail" };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
