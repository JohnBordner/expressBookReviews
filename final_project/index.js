const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const jwtSecret = '2c9e3e0120f6d7ede3ce13415f548baa40071e07';

const app = express();

app.use(express.json());

//middleware
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    
    const authHeader = req.headers['authorization']
        if (!authHeader) return res.status(401).json({ message: "No token provided" });
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: "Token is invalid" });

    jwt.verify(token,jwtSecret, (err, user) => {
        if (err){
            return res.status(403).json({message: "Token is Invalid"})
        }
        req.user = user;
        next();
    });
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));

