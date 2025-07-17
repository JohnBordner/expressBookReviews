const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const jwtSecret = '2c9e3e0120f6d7ede3ce13415f548baa40071e07';
let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid




}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    //users.push({ username, password });
    const { username, password } = req.body;
    let user = users.find((u)=> u.username === username && u.password === password);
    if (user == null){
        return res.status(401).json({message: "Login Failed!"});
    }
    const accessToken = jwt.sign({username}, jwtSecret, {expiresIn: '1800s'}); 
    return res.status(200).json({message: `${username} signed in successfully`, token: accessToken});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    
    let username = req.user?.username;    
    let isbn = req.params.isbn;
    const review = req.query.review;
    
    if (books[isbn]){
        
    }
    




  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

