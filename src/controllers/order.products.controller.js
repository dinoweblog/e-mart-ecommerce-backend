const express = require("express");

const authenticate = require("../middlewares/authenticate");

const Order = require("../models/order.products.model");
const Product = require("../models/products.model");
const User = require("../models/user.model");

const router = express.Router();

router.post("/your-order", authenticate, async (req, res) => {
  try {
    const order = await Order.create(req.body);

    return res.send({ order });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/your-order/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();

    const user_id = user._id;
    let qty = 0;
    let orderitems = [];
    let itemQty = [];
    let totalAmount = 0;
    let date = [];

    const order = await Order.find({ userId: user_id }).lean().exec();
    console.log(order);
    if (order.length > 1) {
      for (let i = 0; i < order.length; i++) {
        date.push(order[i]._id.getTimestamp());
        itemQty.push(order[i].quantity);
        qty += order[i].quantity;
        const item = await Product.findById(order[i].productId).lean().exec();
        orderitems.push(item);
        totalAmount += item.newPrice * order[i].quantity;
      }
    } else if (order.length === 1) {
      date.push(order[0]._id.getTimestamp());
      qty = order[0].quantity;
      const item = await Product.findById(order[0].productId).lean().exec();
      orderitems.push(item);
      itemQty.push(qty);
      totalAmount += item.newPrice * order[0].quantity;
    }

    return res.send({ qty, orderitems, itemQty, order, totalAmount, date });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/your-order/cancel/:id", authenticate, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    return res.status(201).send({ order });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
