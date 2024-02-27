const Book = require("../models/book");

const getAllBooks = async (req, res) => {
    try {
        const booksList = await Book.find();
        console.log(booksList);
        res.status(201).json({
            message: "Collected all books",
            books: booksList,
        });
    } catch (error) {
        console.error(error);
        res.status(400);
    }
};

const getBookByID = async (req, res) => {
    const bookID = req.params.id;
    try {
        const book = await Book.findById(bookID);
        console.log(book);
        res.status(201).json({
            message: "Found the book your looking for!",
            book: book,
        });
    } catch (error) {
        console.error(error);
        res.status(400);
    }
};

const BookController = {
    getAllBooks: getAllBooks,
    getBookByID: getBookByID,
};

module.exports = BookController;
