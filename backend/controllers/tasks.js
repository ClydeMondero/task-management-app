const TaskModel = require('../models/task');//task model
const UserModel = require('../models/user');//user model
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.addTask = async (req, res) => {
    //saves the new task on success and error if failed
    try {
        //create a new task based on the Task model and values from the request body
        const { title, dueDate, isCompleted } = req.body;
        const task = await TaskModel.create({
            title, dueDate, isCompleted
        })

        //decode the jwt cookie to find the user id
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const userId = decoded.id;

        //references the task id to the user who created it
        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { tasks: task._id } },
            { new: true, useFindAndModify: false }
        )

        res.status(200).json(task);//success
    } catch (error) {
        res.status(400).json({ message: error.message });//bad request
    }
}

exports.getTasks = async (req, res) => {
    try {
        //decode the jwt cookie to find the user id
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const userId = decoded.id;

        //find the tasks of a user
        const tasks = await UserModel
            .findById(userId)
            .populate('tasks')
            .select('tasks -_id');

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });//internal server error
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id);

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = req.body;
        const options = { new: true };

        const result = await TaskModel.findByIdAndUpdate(
            id, task, options
        )

        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.params.id);
        res.send(`Document with the title of ${task.title} has been deleted`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
