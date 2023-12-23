const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const taskSchema = require('./task');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Your email is required'],
        unique: true
    },
    username: {
        type: String,
        require: [true, 'Your username is required']
    },
    password: {
        type: String,
        require: [true, 'Your password is required']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    tasks: {
        type: [taskSchema]
    }
})

userSchema.pre('save', async () => {
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model('User', userSchema)
