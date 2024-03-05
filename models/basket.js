
const mongoose = require("mongoose");

const BasketItemSchema = new mongoose.Schema({
    items: {type: Array},
    user_id: {type: String}
});

const Basket = mongoose.model("Basket", BasketItemSchema);

module.exports = Basket;