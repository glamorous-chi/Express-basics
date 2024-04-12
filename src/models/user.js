const mongoose = require('mongoose');

// Creating User schema
const {Schema} = mongoose;

const userSchema = new Schema(
    // Creating the User object
    {
        name: {
            type: String,
            required: true,  
            trim: true, 
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            min: 6,
            max: 64
        },
        image:String,
        role:{
            type: String,
            default: "user"
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model('User',userSchema)