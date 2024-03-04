const express = require("express");
const router = express.Router();

const BookController = require("../controllers/books");

router.get("/all", BookController.getAllBooks);
router.get("/find/:id", BookController.getBookByID);
router.get("/filter", BookController.getBooksByCategories);

module.exports = router;
