
const mongoose = require("mongoose");

const BasketItemSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    }],
    user_id: {
        type: String,
        ref: "User",
        required: true
    },
    email: {
        type: String
    }
});

const Basket = mongoose.model("Basket", BasketItemSchema);

module.exports = Basket;