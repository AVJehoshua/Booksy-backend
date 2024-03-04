const Review = require("../models/review");
const mongoose = require("mongoose");

const getAllReviews = async (req, res) => {
    const reviews = await Review.find({ book_id: req.params.book_id }).populate(
        {
            path: "user_id",
            select: "first_name last_name",
        }
    );
    if (!reviews) {
        res.status(200).json({ message: "No reviews found for this book" });
    }
    res.status(200).json({
        message: "Successfully collected reviews ",
        reviews: reviews,
    });
};

const createReview = async (req, res) => {
    const { book_id, user_id, title, content, rating } = req.body;

    const review = new Review({
        book_id,
        user_id,
        title,
        content,
        rating,
    });

    try {
        await review
            .save()
            .then(res.status(201).json({ message: "Review created" }));
    } catch (error) {
        res.status(400).json({ message: `Error: ${error}` });
    }
};

const BookController = {
    getAllReviews: getAllReviews,
    createReview: createReview,
};

module.exports = BookController;
