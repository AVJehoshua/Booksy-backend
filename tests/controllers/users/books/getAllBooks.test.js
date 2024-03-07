const supertest = require('supertest');
const app = require('../app'); // Import your Express app
const request = supertest(app);
const Book = require("../../models/book");
const mongoose = require('mongoose')


describe('Book controller Tests', () => {
    it('fetches all book objects', async () => {
        // Mocking the Book.find() function to return a predefined list of books
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

        // Mocking the Book.find() function
        jest.spyOn(Book, 'find').mockResolvedValue(testBooksList);

        // Making a request to the getAllBooks controller function
        const response = await getAllBooks();

        // Assertions
        expect(response.status).toBe(200); // Ensure the status code is 200
        expect(response.body).toEqual({ // Ensure the response body matches the expected structure
            message: "Collected all books",
            books: mockBooksList,
        });
    });

    it('returns an error when Book.find() fails', async () => {
        // Mocking the Book.find() function to throw an error
        jest.spyOn(Book, 'find').mockRejectedValue(new Error('Database error'));

        // Making a request to the getAllBooks controller function
        const response = await getAllBooks();

        // Assertions
        expect(response.status).toBe(400); // Ensure the status code is 400 (or whichever status code you set in your catch block)
        // You can add more assertions based on your error handling logic in the catch block
    });
});