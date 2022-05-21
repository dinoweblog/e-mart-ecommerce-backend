const mongoose = require("mongoose");

const cartProductsSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    quantity: { type: Number, required: true, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartProductsSchema);
