const express = require('express');//server

const app = express();
const port = 3000;

const cors = require('cors');//cors

//enable all cors request 
app.use(cors());

//parses request to JSON
app.use(express.json());

app.listen(port, () => console.log('Server connected'));

//database
const connectDB = require('./db');
connectDB();

//routes
const tasksRoute = require('./routes/tasks');
app.use('/tasks', tasksRoute);
