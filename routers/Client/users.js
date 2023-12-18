const express = require("express");
const {
  register,
  login,
  getProducts,
  addOrders,
} = require("../../models/Client/users");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/products/view", getProducts);
router.post("/orders/add", addOrders);
module.exports = router;
