const mongoose = require("mongoose");

const BasketItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    });

    const BasketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [BasketItemSchema],
    });

const Basket = mongoose.model("Basket", BasketSchema);

module.exports = Basket;
