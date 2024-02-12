const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
