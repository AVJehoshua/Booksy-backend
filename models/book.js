const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: mongoose.Types.Decimal128,
  ISBN_10: String,
  ISBN_13: String,
  image_url: String,
  synopsis: String,
  category: String,
});

const Book = mongoose.model("books", BookSchema);

module.exports = Book;
