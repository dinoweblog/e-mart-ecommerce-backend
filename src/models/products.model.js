const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    imageURL: { type: String, required: true },
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    img4: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    off: { type: Number, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    size: [{ type: String, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
