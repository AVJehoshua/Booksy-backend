const supertest = require('supertest');
const app = require('../../../../app'); // Import your Express app
const request = supertest(app);
const Book = require("../../../../models/book");
const mongoose = require('mongoose')
const { getAllBooks, getBookByID, getBooksByCategories } = require('../../../../controllers/books')


describe('Book controller tests', () => {
    it('Fetches all book objects', async () => {
        const  testBooksList = [
            {
                title: 'Book 1',
                author: 'Author 1',
                price: mongoose.Types.Decimal128.fromString('10.99'),
                ISBN_10: '1234567890',
                ISBN_13: '9781234567890',
                image_url: 'https://example.com/book1.jpg',
                synopsis: 'Synopsis for Book 1',
                category: 'Category 1',
            },
            {
                title: 'Book 2',
                author: 'Author 2',
                price: mongoose.Types.Decimal128.fromString('12.99'),
                ISBN_10: '0987654321',
                ISBN_13: '9780987654321',
                image_url: 'https://example.com/book2.jpg',
                synopsis: 'Synopsis for Book 2',
                category: 'Category 2',
            },
        ];
        jest.spyOn(Book, 'find').mockResolvedValue(testBooksList);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllBooks(req, res);

        expect(res.status).toHaveBeenCalledWith(200); 
        expect(res.json).toHaveBeenCalledWith({ 
            message: "Collected all books",
            books: testBooksList,
        });
    });


    it('Fetches a book by its ID', async () => {
        const bookId = '65ddd7a6b872e601b2a7cbfb';
    
        const testBookByID = {
            title: 'Book 1',
            author: 'Author 1',
            price: mongoose.Types.Decimal128.fromString('10.99'),
            ISBN_10: '1234567890',
            ISBN_13: '9781234567890',
            image_url: 'https://example.com/book1.jpg',
            synopsis: 'Synopsis for Book 1',
            category: 'Category 1',
        };
    
        jest.spyOn(Book, 'findById').mockResolvedValue(testBookByID);
    
        const req = { params: { bookId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        await getBookByID(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Found the book your looking for!",
            book: testBookByID,
        });
    });

    it('Fetches books by categories', async () => {
        const categories = 'Category 1,Category 2';
        const testBooksList = [
            {
                title: 'Book 1',
                author: 'Author 1',
                price: mongoose.Types.Decimal128.fromString('10.99'),
                ISBN_10: '1234567890',
                ISBN_13: '9781234567890',
                image_url: 'https://example.com/book1.jpg',
                synopsis: 'Synopsis for Book 1',
                category: 'Category 1',
            },
            {
                title: 'Book 2',
                author: 'Author 2',
                price: mongoose.Types.Decimal128.fromString('12.99'),
                ISBN_10: '0987654321',
                ISBN_13: '9780987654321',
                image_url: 'https://example.com/book2.jpg',
                synopsis: 'Synopsis for Book 2',
                category: 'Category 2',
            },
        ];
        jest.spyOn(Book, 'find').mockResolvedValue(testBooksList);
    
        const req = { query: { categories } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        await getBooksByCategories(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: `Found books in these categories ${categories}`,
            books: testBooksList,
        });
    });
    
    it('Returns an error when Book.find() fails', async () => {
        const categories = 'Category 1,Category 2';
        jest.spyOn(Book, 'find').mockRejectedValue(new Error('Database error'));
    
        const req = { query: { categories } }; 
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        await getBooksByCategories(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
    });
    
});
