const express = require("express");

const authenticate = require("../middlewares/authenticate");

const Wishlist = require("../models/wishlist.model");
const User = require("../models/user.model");

const router = express.Router();

router.post("/items", authenticate, async (req, res) => {
  try {
    const wishlist = await Wishlist.create(req.body);

    return res.send({ wishlist });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/items/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();

    const user_id = user._id;

    const wishlist = await Wishlist.find({ userId: user_id })
      .populate("productId")
      .lean()
      .exec();

    return res.send({ wishlist });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/items/find/:userId/:id", authenticate, async (req, res) => {
  try {
    const userId = req.params.userId;
    const prodId = req.params.id;
    const user = await User.findById(userId).lean().exec();

    const user_id = user._id;

    const wishlist = await Wishlist.find({ userId: user_id, productId: prodId })
      .lean()
      .exec();

    let check;

    if (wishlist.length === 0) {
      check = "true";
    } else {
      check = "false";
    }

    return res.send(check);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/items/delete/:id", authenticate, async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);

    return res.status(201).send({ wishlist });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
