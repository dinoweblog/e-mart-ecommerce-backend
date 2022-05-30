const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    couponCode : {type: String, required: true},
    couponPrice: {type: Number, required: true}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("coupon", couponSchema);
