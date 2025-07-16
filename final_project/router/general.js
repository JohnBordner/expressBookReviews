const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  const userExists = users.some(user => user.username === username);



    if (username == "" || password == "" ){
        return res.status(404).json({message:"Username or password cannot be left blank!"});
    }

    else if (userExists){
        return res.status(404).json({message:"Username already taken!"});
    }
    else{

        users.push({ username, password });
        return res.status(200).json({message:"User Successfully Registered!"});
    }

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;

    if (books[isbn]){
        return res.status(200).send(JSON.stringify(books[isbn], null, 4));
    }
    else{
        return res.status(404).json({message: "No Book with that ISBN"});
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    let matchingBooks = [];
    for (let isbn in books){
        if (books[isbn].author === author){
            matchingBooks.push(books[isbn]);
        }
    }
    if (matchingBooks.length>0){
        return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
    }
    else{
        return res.status(404).json({message: "No Book with that Author"});
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let matchingBooks = [];
    for (let isbn in books){
        if (books[isbn].title === title){
            matchingBooks.push(books[isbn]);
        }
    }
    if (matchingBooks.length>0){
        return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
    }
    else{
        return res.status(404).json({message: "No Book with that Title"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;

    if (books[isbn]){

        return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
    }
    else{
        return res.status(404).json({message: "No Book with that ISBN"});
    }
});

module.exports.general = public_users;
