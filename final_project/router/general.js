const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({username: username, password: password});
      return res.status(200).json({message: "User successfully registered"});
    }
    else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  else {
    return res.status(400).json({message: "Unable to register user. Please provide username and password."});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn], null,4));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filteredAuthor = Object.valueus(books).filter(book => book.author === author);
  res.send(JSON.stringify(filteredAuthor, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filteredTitle = Object.values(books).filter(book => book.title === tile);
  res.send(JSON.stringify(filteredTitle, null, 4)); 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn], null,4));
});

module.exports.general = public_users;
