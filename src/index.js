const express = require("express");
const cors = require("cors");
const { register, login } = require("./controllers/auth.controller");
const productController = require("./controllers/products.controller");
const cartProductController = require("./controllers/cart.products.controller");
const wishlistProductController = require("./controllers/wishlist.controller");
const orderProductController = require("./controllers/order.products.controller");
const addressController = require("./controllers/user.address.controller");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.post("/register", register);
app.post("/login", login);

app.use("/products", productController);
app.use("/cart", cartProductController);
app.use("/wishlist", wishlistProductController);
app.use("/product-order", orderProductController);
app.use("/user", addressController);

module.exports = app;
