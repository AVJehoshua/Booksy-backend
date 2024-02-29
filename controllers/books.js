const Book = require("../models/book");

const getAllBooks = async (req, res) => {
    try {
        const booksList = await Book.find();
        console.log(booksList);
        res.status(200).json({
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
        res.status(200).json({
            message: "Found the book your looking for!",
            book: book,
        });
    } catch (error) {
        console.error(error);
        res.status(400);
    }
};

const getBooksByCategories = async (req, res) => {
    const { categories } = req.query;
    console.log(categories);
    const categoryList = categories.split(",");
    try {
        const booksList = await Book.find({ category: { $in: categoryList } });
        res.status(200).json({
            message: `Found books in these categories ${categoryList}`,
            books: booksList,
        });
    } catch (error) {
        console.error(error);
        res.status(400);
    }
};

const BookController = {
    getAllBooks: getAllBooks,
    getBookByID: getBookByID,
    getBooksByCategories: getBooksByCategories,
};

module.exports = BookController;
