require('dotenv').config();
const jwt = require('jsonwebtoken');

const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN  
    });
};

module.exports = createSecretToken;
