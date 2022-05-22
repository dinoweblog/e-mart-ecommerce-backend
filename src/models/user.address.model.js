const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    town: { type: String, required: true },
    state: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("address", userAddressSchema);
