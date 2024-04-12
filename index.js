// import express
const express = require('express');
//import log in
const {login} = require('./src/controllers/auth');
//import getProduct
const {getProduct,getAllProducts} = require('./src/controllers/product');
const productRouter = require('./src/routes/product')
const authRouter = require('./src/routes/auth')
// importing the dotenv
const dotenv = require("dotenv")
// importing mongoose - An ODM (Object Data Modelling)
// ORM means Object-relational mapping (ORM)
const mongoose = require("mongoose")
const {connectDb} = require("./src/db.config")
const {hashedPassword} = require("./src/helpers/auth")

// dotenv configuration - this makes anything written in the env file visible here in index.js
dotenv.config()

const PORT = process.env.PORT
console.log(PORT);

const secret = process.env.MY_SECRET
console.log(secret);

const dbUrl = process.env.MONGODB_URL
console.log(dbUrl);

// Connecting to connectDB using our dbUrl which is our MONGODB_URL
connectDb(dbUrl)

// Trying out our hashedpassword function
// const password =  "password"
// console.log("passwords" , password);

// const hashedPwd = hashedPassword(password)
// setTimeout(() =>{
//    console.log(hashedPwd);
// }, 5000)

// const isUser = comparePassword("password", hashedPwd)

// setTimeout(() => {
//    console.log(isUser);
// }, 10000)


// initialize express
const app = express();

// middlewares
app.use(express.json())

// create server
// server.get("route", callback function)
// OR 
// app.get("route", callback function)

//product route
// The call back function below is called a controller function i.e getProduct

// app.get("/product", getProduct) //getProduct is passed here as a callback function, it is in product.js
app.get("/", (req, res) => {
   return res.json({message: "Welcome to Node API"})
}) 

//Login route
// app.get("/login", login) // the login function is in auth.js

//products route
// app.get("/products", getAllProducts) // the products function is in products.js


//router
// app.use(route, router)
app.use("/api/product", productRouter)
app.use("/api/auth", authRouter)

// listen to server

app.listen(PORT, () => console.log("My express server"))

