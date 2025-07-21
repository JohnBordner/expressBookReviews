const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = users.some(user => user.username === username);
    if (username == "" || password == "" ){
        return res.status(400).json({message:"Username or password cannot be left blank!"});
    }
    else if (userExists){
        return res.status(400).json({message:"Username already taken!"});
    }
    else{
        users.push({ username, password });
        return res.status(200).json({message:"User Successfully Registered!"});
    }
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
      try {
        const response = await axios.get('URL_GET_BOOKS');
        const allBooks = response.data;
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
    const isbn = req.params.isbn;
    try{
        const response = await axios.get(`URL_GET_BOOK_BY_ISBN/${isbn}`);
        const book = response.data;
        res.status(200).json(book);
    }
    catch (error){
        res.status(500).json({ message: "Error fetching books", error: error.message });  
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
    const author = req.params.author;
    try{
        const response = await axios.get(`URL_TO_GET_BOOKS_BY_AUTHOR/${author}`);
        const booksByAuthor = response.data;
        res.status(200).json(booksByAuthor);
    }catch(error){
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }

});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    let title = req.params.title;
    try{
        const response = await axios.get(`URL_TO_GET_BOOKS_BY_TITLE/${title}`);
        const booksByTitle = response.data;
        res.status(200).json(booksByTitle);
    }catch(error){
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    if (books[isbn]){
        return res.status(200).json(books[isbn].reviews);
    }
    else{
        return res.status(404).json({message: "No Book with that ISBN"});
    }
});

module.exports.general = public_users;
