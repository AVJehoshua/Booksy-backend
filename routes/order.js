const express = require("express");
const router = express.Router();

// Make sure the path is correct and the file exists
const orderController = require("../controllers/order");


router.post("/create", orderController.createOrder);

module.exports = router;
