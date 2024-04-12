//import express
const express = require('express')
const { login,signUp } = require('../controllers/auth')
const { getAllUsers, getOneUser } = require('../controllers/user')
// create express router
const router = express.Router()
// define your routes/endpoints
router.post("/login", login) //We are sending a POST request, not a GET request because we are sending informstion to the backend
router.post("/signup", signUp)
router.get("/users", getAllUsers)
router.get("/user/:userId",getOneUser)

module.exports = router