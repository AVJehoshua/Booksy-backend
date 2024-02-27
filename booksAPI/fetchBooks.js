const { connectToDatabase } = require("../db/db");
const Book = require("../models/book");

connectToDatabase();

const prompt = require("prompt-sync")();

const addABook = () => {
  book_search = prompt("What book do you want to search for? ");
  let encoded_search_query = encodeURIComponent(book_search);
  //console.log(encoded_search_query);

  const fetchBooks = async (book) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${book}`
      );
      const data = await response.json();
      data.items.forEach((book, index) => {
        console.log(
          `${index + 1}. ${book.volumeInfo.title} by ${
            book.volumeInfo.authors
          } image:${book.volumeInfo.imageLinks}`
        );
      });
      return data.items;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  (async () => {
    const books = await fetchBooks(encoded_search_query);
    book_search = prompt("Which book do you want to choose? ");
    chosen_book = books[book_search - 1];
    console.log(chosen_book.volumeInfo.title);
    console.log("\n");

    book_price = prompt("Price for book: ");
    book_category = prompt("Category for book ");

    //Checks
    image = "";
    if (chosen_book.volumeInfo.imageLinks?.thumbnail) {
      image = chosen_book.volumeInfo.imageLinks.thumbnail;
    }

    ISBN_13_value = "";
    if (chosen_book.volumeInfo.industryIdentifiers.length > 1) {
      ISBN_13_value = chosen_book.volumeInfo.industryIdentifiers[1].identifier;
    }

    const book = new Book({
      title: chosen_book.volumeInfo.title,
      author: chosen_book.volumeInfo.authors[0],
      price: book_price,
      ISBN_10: chosen_book.volumeInfo.industryIdentifiers[0].identifier,
      ISBN_13: ISBN_13_value,
      image_url: image,
      synopsis: chosen_book.volumeInfo.description,
      category: book_category,
    });

    const createdBook = await book.save();
    console.log(createdBook);

    moreBooks = prompt("Add more books (y/n)? ");
    if (moreBooks === "y") {
      addABook();
    }
  })();
};

addABook();
