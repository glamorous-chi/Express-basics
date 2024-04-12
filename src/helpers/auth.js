const bcrypt = require('bcrypt')

// hash the password
const hashedPassword = (password) => {
    // One function to create the hashed password and another to check the password
    return new Promise((resolve, reject) => {
        // generating saltRound
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            // generating the hashed password
            bcrypt.hash(password, salt, ((err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            }))
        })
    })
}

// checking the password - It compares the password against the one in the db (the hashed password)
const comparePassword = (password, hashed) => {
    return bcrypt.compare(password,hashed)
}

module.exports = {hashedPassword, comparePassword}