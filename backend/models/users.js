const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const taskSchema = require('./task');

//user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Your email is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Your username is required']
    },
    password: {
        type: String,
        required: [true, 'Your password is required']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    tasks: {
        type: [taskSchema.schema],
    }
})

//hashes the password before saving
userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model('User', userSchema);
