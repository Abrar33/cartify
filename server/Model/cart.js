const { model, Schema, default: mongoose } = require("mongoose");
const cartSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number },
});
const Cart = model("cart", cartSchema);
module.exports = Cart;
