const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.send('Tasks');
})

router.post('/add', (req, res) => {
    res.send('Task added');
})

router.get('/get', (req, res) => { 
    res.send('Get all tasks');
})

router.get('/get/:id', (req, res) => {
    res.send('Get a single task');
})

router.patch('/update/:id', (req, res) => {
    res.send('Task updated');
})

router.delete('/delete/:id', (req, res) => {
    res.send('Task deleted');
})

module.exports = router;
