const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
    },
    isCompleted: {
        type: Boolean,
        required: true
    }
})


module.exports = mongoose.model('Task', taskSchema);
