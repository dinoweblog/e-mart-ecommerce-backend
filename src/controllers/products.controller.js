const express = require("express");

const Product = require("../models/products.model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.get("/women", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 20;
    let search = req.query.search;

    const skip = (page - 1) * size;

    let products, totalPages;
    if (!search) {
      products = await Product.find().skip(skip).limit(size).lean().exec();

      totalPages = Math.ceil((await Product.find().countDocuments()) / size);
    } else {
      products = await Product.find({ name: search })
        .skip(skip)
        .limit(size)
        .lean()
        .exec();
      totalPages = Math.ceil((await Product.find().countDocuments()) / size);
    }

    return res.status(200).send({ products, totalPages });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/women/filter", async (req, res) => {
  try {
    const filterType = req.query.category;

    let products;
    switch (filterType) {
      case "indian":
        products = await Product.find({ category: "indian" }).lean().exec();
        break;
      case "western":
        products = await Product.find({ category: "western" }).lean().exec();
        break;
      case "sportsmaternity":
        products = await Product.find({ category: "sports" }).lean().exec();
        break;
      case "maternity":
        products = await Product.find({ category: "maternity" }).lean().exec();
        break;

      default:
        products = await Product.find().lean().exec();
    }

    return res.status(200).send({ products });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post(
  "/create",

  async (req, res) => {
    try {
      const product = await Product.create(req.body);

      return res.send({ product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get(
  "/:id",

  async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id).lean().exec();

      return res.send({ product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.patch(
  "/update/:id",

  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();

      return res.status(201).send(product);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
);

router.delete(
  "/delete/:id",

  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      return res.status(201).send(product);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
);

module.exports = router;
