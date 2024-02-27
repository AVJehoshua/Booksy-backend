const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book");

router.get("/all", BookController.getAllBooks);
router.get("/find/:id", BookController.getBookByID);

module.exports = router;
