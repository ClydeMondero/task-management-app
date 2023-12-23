const asyncHandler = require('express-async-handler');
const TaskModel = require('../models/task');//task model

exports.addTask = asyncHandler(async (req, res) => {
    //create a new task based on the Task model and values from the request body
    const task = new TaskModel({
        title: req.body.title,
        dueDate: req.body.dueDate,
        isCompleted: false
    })

    //saves the new task on success and error if failed
    try {
        const createdTask = await task.save();
        res.status(200).json(createdTask);//success
    } catch (error) {
        res.status(400).json({ message: error.message });//bad request
    }
})

exports.getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });//internal server error
    }
})

exports.getTask = asyncHandler(async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

exports.updateTask = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTask = req.body;
        const options = { new: true };

        const result = await TaskModel.findByIdAndUpdate(
            id, updatedTask, options
        )

        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

exports.deleteTask = asyncHandler(async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.params.id);
        res.send(`Document with the title of ${task.title} has been deleted`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
