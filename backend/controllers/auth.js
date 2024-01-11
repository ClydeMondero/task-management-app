const UserModel = require('../models/user');
const createSecretToken = require('../utils/secretToken');
const bcrypt = require('bcryptjs');

//signup controller
exports.signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, agreement, createdAt } = req.body;//get user details from the req body

        //check if fields are given
        if (!email || !password) return res.json({ warning: true, message: "All fields are required" });

        //check if password match 
        if (password != confirmPassword) return res.json({ warning: true, message: "Password don't match" });

        //check if user agreed to agreement
        if (!agreement) return res.json({ warning: true, message: "Agree to TASQ's Terms of Service and Privacy Policy first" });

        //check if the email of the user already exists
        const isExistingUser = await UserModel.findOne({ email });
        if (isExistingUser) {
            return res.json({ message: 'User already exists' });
        }

        //create a new user
        const user = await UserModel.create({
            username, email, password, createdAt
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

        //chech if fields are given
        if (!email || !password) return res.json({ warning: true, message: "All fields are required" });

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
