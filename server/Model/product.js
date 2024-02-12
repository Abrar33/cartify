const { model, Schema } = require("mongoose");
// const productsSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter Name"],
//     maxLength: [40, `Product name cannot exceed 40 words`],
//   },
//   price: {
//     type: Number,
//     required: [true, "Please enter price"],
//     maxLength: [5, `Product name cannot exceed 5 digits`],
//     default: 0.0,
//   },
//   description: {
//     type: String,
//     required: [true, "Please enter Description"],
//   },
//   rating: {
//     type: Number,
//     default: 0,
//   },
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum: ["men", "women", "random"] },
  subCategory: { type: String },
  // companyId: { type: Schema.Types.ObjectId, ref: "Company" },
  // storeId: { type: Schema.Types.ObjectId, ref: "Store" },
  createdAt: { type: Date, default: Date.now },
});

const Product = model("Product", productSchema);

module.exports = Product;
