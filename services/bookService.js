import axios from "axios";

// https://www.googleapis.com/books/v1/volumes?q=inauthor:Gabriel Garcia&key=AIzaSyAVQnU-j_z7U6vrwGpAGbTDVgM7_eh9drU

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

const bookService = {
  searchBooks: async (query) => {
    const response = await axios.get(`${GOOGLE_BOOKS_API_URL}?q=${query}`);
    return response.data.items;
  },
};

const getBookByAuthor = async (author) => {
  const response = await axios.get(`${GOOGLE_BOOKS_API_URL}?q=inauthor:${author}`);
  return response.data.items;
};

const getBooksByAuthors = async (authors) => {
  const promises = authors.map((author) => getBookByAuthor(author));
  const books = await Promise.all(promises);
  return books.flat();
}


/*
Title
Author
Genre/Subject
  Fiction
  History
  Science
  Biography
  Cooking
  Art
  Business
  Technology
  Travel
Synopsis:
Details:
  Published Date
  Pages
  Rating
  ISBN
*/
