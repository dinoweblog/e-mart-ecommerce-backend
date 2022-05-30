const express = require("express");

const authenticate = require("../middlewares/authenticate");

const Coupon = require("../models/coupon.model");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    return res.send({ coupon });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findById(id).lean().exec();

    return res.send({ coupon });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    return res.status(201).send({ coupon });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.patch("/update/:id", authenticate, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body);

    return res.status(201).send({ coupon });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
