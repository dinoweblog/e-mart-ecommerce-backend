const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    mobile: { type: Number, required: true },
    pincode: { type: Number, required: true },
    addressField: { type: String, required: true },
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
