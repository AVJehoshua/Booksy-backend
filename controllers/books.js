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

const getBooksBySearch = async (req, res) => {
    
    if (req.params.searchQuery !== " ")
    console.log("backend author :", req.params.author)
    try {
        const authorBookResults = await Book.find({ $or: [

            {author: { $regex: req.params.searchQuery, $options: 'i' }},
            {title: { $regex: req.params.searchQuery, $options: 'i' }},
        ]})

        res.status(200).json({
            message: `Fetched books with titles: ${authorBookResults}`,
            book: authorBookResults
        }); 
        console.log(`backend author response sent: ${authorBookResults}`)
    } catch (error) {
        console.error('Error fetching books by author:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
};


const BookController = {
    getAllBooks: getAllBooks,
    getBookByID: getBookByID,
    getBooksByCategories: getBooksByCategories,
    getBooksBySearch: getBooksBySearch,
};

module.exports = BookController;

