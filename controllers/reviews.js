const Review = require("../models/review");
const mongoose = require("mongoose");

const getAllReviews = async (req, res) => {
    const reviews = await Review
        // .find({
        //     book_id: req.params.book_id,
        // })
        .aggregate([
            {
                $match: {
                    book_id: new mongoose.Types.ObjectId(req.params.book_id),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    rating: 1,
                    createdAt: 1,
                    first_name: "$user.first_name",
                    last_name: "$user.last_name",
                },
            },
        ]);
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
