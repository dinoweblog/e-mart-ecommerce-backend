const mongoose = require("mongoose");

const wishlistProductsSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("wishlist", wishlistProductsSchema);
