const express = require("express");

const authenticate = require("../middlewares/authenticate");

const Cart = require("../models/cart.products.model");
const Product = require("../models/products.model");
const User = require("../models/user.model");

const router = express.Router();

router.post("/items", authenticate, async (req, res) => {
  try {
    const cart = await Cart.create(req.body);

    return res.send({ cart });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/items/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();

    const user_id = user._id;
    let qty = 0;
    let cartitems = [];
    let itemQty = [];

    const cart = await Cart.find({ userId: user_id }).lean().exec();
    console.log(cart);
    if (cart.length > 1) {
      for (let i = 0; i < cart.length; i++) {
        itemQty.push(cart[i].quantity);
        qty += cart[i].quantity;
        const item = await Product.findById(cart[i].productId).lean().exec();
        cartitems.push(item);
      }
    } else if (cart.length === 1) {
      qty = cart[0].quantity;
      const item = await Product.findById(cart[0].productId).lean().exec();
      cartitems.push(item);
      itemQty.push(qty);
    }

    return res.send({ qty, cartitems, itemQty, cart });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/items/delete/:id", authenticate, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    return res.status(201).send({ cart });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.get("/items/find/:userId/:id", authenticate, async (req, res) => {
  try {
    const userId = req.params.userId;
    const prodId = req.params.id;
    const user = await User.findById(userId).lean().exec();

    const user_id = user._id;

    const cart = await Cart.find({ userId: user_id, productId: prodId })
      .lean()
      .exec();

    let check;

    if (cart.length === 0) {
      check = "true";
    } else {
      check = "false";
    }

    return res.send(check);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/items/delete-all/:id", authenticate, async (req, res) => {
  try {
    const cart = await Cart.deleteMany({ userId: req.params.id });

    return res.status(201).send({ cart });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.patch("/items/update/:id", authenticate, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send({ cart });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
