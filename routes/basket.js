// basket.routes.js

const express = require("express");
const router = express.Router();
const BasketController = require("../controllers/basket");


router.post("/:userId/add", BasketController.addItemToBasket);
router.put("/:userId/update/:itemId", BasketController.updateItemQuantity);
router.delete("/:userId/remove/:itemId", BasketController.removeItemFromBasket);
router.get("/:userId", BasketController.getBasket);

module.exports = router;
