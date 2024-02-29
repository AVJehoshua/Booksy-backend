const mongoose = require("mongoose");


const BasketItemSchema = new mongoose.Schema({
    
    // quantity: {
    //     type: Number,
    //     required: true,
    //     default: 1,
    // },

    items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },

    email: {
        type: String,
    },

    // order_completed: {
    //     type: Boolean,
    //     default: false,
    // },

    });

    const Basket = mongoose.model("Basket", BasketItemSchema);

    module.exports = Basket