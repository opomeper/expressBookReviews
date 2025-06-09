const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const { use } = require('react');
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  let userswithsamename = users.filter(user => user.username !== username);
  if (userswithsamename.length > 0) {
    return false; // username already exists
  }
  else {
    return true; // username is valid
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
  let validuser = users.filter(user => (user.username === username && user.password === password));
  if (validuser.length > 0) {
    return true; // user is authenticated
  }
  else {
    return false; // user is not authenticated
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Unable to login. Please provide username and password."});
  }

  if (authenticatedUser(username, password)) {
    // Generate an access token
    let accessToken = jwt.sign({data: password}, 'access', {expiresIn: 60*60}); // token valid for 1 hour
    req.session.authorization = {accessToken, username}; // store token in session
    return res.status(200).json({message: "User successfully logged in"});
  }
  else {
    return res.status(401).json({message: "Invalid username or password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
