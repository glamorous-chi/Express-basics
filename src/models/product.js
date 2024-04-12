// Create product schema
// create a function in your product.js controllers like signup
// route your product in product.js, import createProduct 
// it is a post request


const mongoose = require('mongoose');

// Creating User schema
const {Schema} = mongoose;

const productSchema = new Schema(
    // Creating the User object
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        price:{
            type: Number,
            required: true,
            trim: true,
        },
        image:{
            type: String,
        },
        imagePublicId:{
            type: String
        },
        desc:{
            type: String,
        },
        isAvailable:{
            type: Boolean,
            default: true
        },
        slug:{
            type: String,
            lowercase: true,
            unique: true
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model('Product',productSchema)