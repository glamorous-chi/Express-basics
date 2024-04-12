// A function that connects straight to the Database Url
// importing mongoose
const mongoose = require('mongoose')
// It will connect to the url
const connectDb = (url) =>
{
// connecting to Mongoose
mongoose
.connect(url)
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Error connecting to Mongoose", err.message))
}

module.exports = {connectDb};