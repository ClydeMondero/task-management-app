const express = require('express');//express app
const router = express.Router();//router

const tasksController = require('../controllers/tasks');

//adds a new task
router.post('/add', tasksController.addTask);

//get all tasks
router.get('/get', tasksController.getTasks);

//get a single task by id
router.get('/get/:id', tasksController.getTask);

//update a task by id
router.patch('/update/:id', tasksController.updateTask);

//delete a task by id
router.delete('/delete/:id', tasksController.deleteTask);

module.exports = router;
