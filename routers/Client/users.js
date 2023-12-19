const express = require("express");
const checkAuthU = require("../../middleware/middlewareUsers");
const {
  register,
  login,
  getProducts,
  addOrders,
} = require("../../models/Client/users");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/products/view",checkAuthU, getProducts);
router.post("/orders/add",checkAuthU, addOrders);
module.exports = router;
