const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model("reviews", ReviewSchema);

module.exports = Review;
