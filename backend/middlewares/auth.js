const UserModel = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.verifyUser = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ isVerified: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
        if (error) {
            return res.json({ isVerified: false });
        } else {
            const user = await UserModel.findById(data.id);

            if (user) return res.json({ isVerified: true, user: user });
            else return res.json({ isVerified: false });
        }
    })
}
