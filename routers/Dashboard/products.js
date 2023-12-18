const express = require("express");
const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../../models/Dashboard/products");
const router = express.Router();

router.get("/view", getProducts);
router.post("/add", addProducts);
router.put("/update/:id", updateProducts);
router.delete("/delete/:id", deleteProducts);

module.exports = router;
