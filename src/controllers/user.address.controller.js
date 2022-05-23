const express = require("express");

const authenticate = require("../middlewares/authenticate");

const User = require("../models/user.model");
const Address = require("../models/user.address.model");

const router = express.Router();

router.post("/address", authenticate, async (req, res) => {
  try {
    const address = await Address.create(req.body);

    return res.send({ address });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/address/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;

    const address = await Address.find({ userId: id }).lean().exec();

    return res.send({ address });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/address/delete/:id", authenticate, async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({ userId: req.params.id });

    return res.status(201).send(address);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.patch("/address/update/:id", authenticate, async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    return res.status(201).send({ address });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
