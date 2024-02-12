const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getProducts,
  addNewProduct,
  productCategoryQuery,
} = require("../Controller/product");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
const router = express.Router();
router.get("/products", getProducts);
router.post("/products/new", upload.single("image"), addNewProduct);
router.get("/products/:category/:subCategory?", productCategoryQuery);
module.exports = router;
