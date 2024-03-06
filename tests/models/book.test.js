const supertest = require('supertest');
const app = require('../../app'); // Import your Express app
const request = supertest(app);
const Book = require("../../models/book");
const mongoose = require('mongoose')
// require("../mongodb_helper");


describe("Book model tests", () => {
    it('has a title', () => {
        const book = new Book({
            title: "Test title",
        });
        expect(book.title).toEqual('Test title')
    });

    it('has an author', () => {
        const book = new Book({
            author: "Test author",
        });
        expect(book.author).toEqual('Test author')
    });

    it('should have a price property of type Decimal128', () => {
        const priceValue = mongoose.Types.Decimal128.fromString('10.99'); // Sample price value

        const book = new Book({
            price: priceValue
        });

        expect(book.price).toEqual(priceValue);
    });

    it('should return the correct price value when retrieved', () => {
        const priceValue = mongoose.Types.Decimal128.fromString('15.50'); // Sample price value

        const book = new Book({
            price: priceValue
        });

        expect(book.price.toString()).toEqual('15.50');
    });

    it('should have an ISBN_10', () => {
        const book = new Book({
            ISBN_10: "Test ISBN_10",
        })
        expect(book.ISBN_10).toEqual("Test ISBN_10");
    });

    it('should have an ISBN_13', () => {
        const book = new Book({
            ISBN_13: "Test ISBN_13",
        })
        expect(book.ISBN_13).toEqual("Test ISBN_13");
    });

    it('should have an image_url', () => {
        const book = new Book({
            image_url: "Test image url",
        })
        expect(book.image_url).toEqual("Test image url");
    });

    it('should have a synopsis', () => {
        const book = new Book({
            synopsis: "Test synopsis",
        })
        expect(book.synopsis).toEqual("Test synopsis");
    });

    it('should have a category', () => {
        const book = new Book({
            category: "Test category",
        })
        expect(book.category).toEqual("Test category");
    });

})