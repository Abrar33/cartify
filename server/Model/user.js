const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  password: { type: Number, required: true },
});
const User = model("User", userSchema);
module.exports = User;
