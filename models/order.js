const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "books",
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    user_id: {
        type: String,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    session_id: String,
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
