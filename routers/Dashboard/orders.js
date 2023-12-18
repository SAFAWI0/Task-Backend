const express = require("express");
const { getOrders ,changStaus} = require("../../models/Dashboard/orders");
const router = express.Router();


router.get("/view", getOrders);
router.post("/changStaus/:id", changStaus);





module.exports = router;