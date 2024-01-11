const UserModel = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.verifyUser = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ status: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
        if (error) {
            return res.json({ status: false });
        } else {
            const user = await UserModel.findById(data.id);

            if (user) return res.json({ status: true, user: user.username });
            else return res.json({ status: false });
        }
    })
}
