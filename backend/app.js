const express = require('express');//server
const cors = require('cors');//cors
const cookieParser = require('cookie-parser');//cookie parser

const app = express();
const port = 3000;

//enable all cors request 
app.use(cors());

//helps magane cookie-based session
app.use(cookieParser());

//parses request to JSON
app.use(express.json());

app.listen(port, () => console.log('Server connected'));

//database
const connectDB = require('./db');
connectDB();

//routes
const tasksRoute = require('./routes/tasks');
const authRoute = require('./routes/auth');

app.use('/tasks', tasksRoute);
app.use('/auth', authRoute);

