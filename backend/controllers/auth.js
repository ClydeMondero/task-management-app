const UserModel = require('../models/users');
const createSecretToken = require('../utils/secretToken');

//signUp controller
exports.signUp = async (req, res, next) => {
    try {
        const { email, username, password, createdAt } = req.body;//get user details from the req body

        //check if the email of the user already exists
        const isExistingUser = await UserModel.findOne({ email });
        if (isExistingUser) {
            return res.json({ message: 'User already exists' });
        }

        //create a new user
        const user = await UserModel.create({
            email, username, password, createdAt
        });

        //create a cookie for the json web token
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        })

        res.status(201).json({ message: "User signed in successfully", success: true, user })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

