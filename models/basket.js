const mongoose = require("mongoose");

const BasketItemSchema = new mongoose.Schema({
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books",
        },
    ],
    user_id: {
        type: String,
        ref: "User",
        required: true,
    },
});

const Basket = mongoose.model("Basket", BasketItemSchema);

module.exports = Basket;
