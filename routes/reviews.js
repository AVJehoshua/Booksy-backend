const express = require("express");
const router = express.Router();
const ReviewsController = require("../controllers/reviews");

router.get("/all/:book_id", ReviewsController.getAllReviews);
router.post("/create", ReviewsController.createReview);

module.exports = router;
