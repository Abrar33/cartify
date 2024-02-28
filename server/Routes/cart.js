const express = require("express");
const {
  postCartItem,
  getCartItems,
  deleteCartItem,
  cartTotalPrice,
} = require("../Controller/cart");
const { authenticateToken } = require("../services/auth");
const router = express.Router();
router.get("/", authenticateToken, getCartItems);
router.get("/total-prices", cartTotalPrice);
router.post("/add", authenticateToken, postCartItem);
router.delete("/remove/:itemId", authenticateToken, deleteCartItem);
module.exports = router;
