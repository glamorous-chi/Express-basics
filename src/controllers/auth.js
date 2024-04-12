//login, forget password, etc logic are written here 

// importing our user database
const User = require("../models/user")
// const bcrypt = require("bcrypt")
const { hashedPassword, comparePassword } = require("../helpers/auth")
// Creating registration function
const signUp = async (req, res) => {
    try {
        // handle request fields using (req.body)
        const { name, email, password } = req.body

        // Field Validation
        if (!name) {
            return res.status(400).json({ success: false, message: "Name required" })
        }
        if (!email) {
            return res.status(400).json({ success: false, message: "Emailrequired" })
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Passowrd required" })
        }


        // Check if email exists already or is taken
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }

        // Hash Password - It was moved to the helpers folder under auth.js
        const hashed = await hashedPassword(password)


        // creating a new user object
        const user = new User({
            name,
            email,
            password: hashed
        })

        // save the new user to the database
        user.save()

        return res.json({ success: true, user })
    }

    catch (err) {
        console.log("Error creating registration", err.message);
        return response.status(500).json({ message: "Registration failed", err })
    }
}

const login = async (req, res) => {
    try {
        // handle request fields using (req.body)
        const { email, password } = req.body

        // Field Validation
        if (!email) {
            return res.status(400).json({ success: false, message: "Email required" })
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Passowrd required" })
        }

        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        // Checking the Password
        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.status(400).json({ success: false, message: "Wrong password" })
        }
        return res.json({ success: true, message: "Login successful" })
    }
    catch (err) {
        console.log("Error creating registration", err.message);
        return res.status(500).json({ message: "Registration failed", err })
    }
}


// const login = (req, res) => {
//     res.send({ message: "Successfully logged in" })
// }

module.exports = { login, signUp }