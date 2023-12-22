const express = require('express');//express app
const router = express.Router();//router

const TaskModel = require('../models/task');//task model

router.get("/", (req, res) => {
    res.send('Tasks');
})

//adds a new task
router.post('/add', async (req, res) => {
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

//get all tasks
router.get('/get', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });//internal server error
    }
})

//get a single task by id
router.get('/get/:id', async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//update a task by id
router.patch('/update/:id', async (req, res) => {
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

//delete a task by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.params.id);
        res.send(`Document with the title of ${task.title} has been deleted`);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
