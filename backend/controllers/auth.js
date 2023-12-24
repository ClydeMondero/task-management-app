const UserModel = require('../models/users');
const createSecretToken = require('../utils/secretToken');
const bcrypt = require('bcryptjs');

//signup controller
exports.signup = async (req, res) => {
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

//login controller 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.json({ message: "All fields are required" });

        //check if email is correct
        const user = await UserModel.findOne({ email });
        if (!user) return res.json({ message: "Incorrect email or password" });

        //check if password is correct
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) return res.json({ message: "Incorrect email or password" });

        //create a cookie for the json web token
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        })

        res.status(201).json({ message: "User logged in successfully", success: true, user })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
