const User = require("../models/user")

// CRUD methods - CREATE, READ OR RETRIEVE, UPDATE, DELETE

// Creating a function to get all users
const getAllUsers = async (req, res) => {
    try{
        const user = await User.find()
        res.json({success: true, message: "Users retrieved successfully", user})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message});
    }
}
// Creating a function to get a user
const getOneUser = async (req, res) => {
    try{
        const {userId} = req.params;

        const user = await User.findById(userId)
        if(!user){
           return res.status(404).json({success: false, message: "User not found"})
        }
       res.json({success: true, message:"User retrieved successfully", user})
    }
    catch(err){
        res.status(500).json({success: false, message: err.message});
    }
}
// Creating a function to update user information
const updateUser = async (req, res) => {
    try{
        
    }
    catch(err){

    }
}
// Creating a function to delete user information
const deleteUser = async (req, res) => {
    try{

    }
    catch(err){

    }
}
module.exports = {getAllUsers, getOneUser}