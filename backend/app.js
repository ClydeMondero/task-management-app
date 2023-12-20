//server
const express = require('express');

const app = express();
const port = 3000;

//parses request to JSON
app.use(express.json());


app.listen(port, () => console.log('Server connected'));

//database
const connectDB = require('./db');
connectDB();
