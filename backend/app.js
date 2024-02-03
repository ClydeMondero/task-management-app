const express = require('express');//server
const cors = require('cors');//cors
const cookieParser = require('cookie-parser');//cookie parser
require('dotenv').config();


const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log('Server connected at port', port));

//enable cors 
app.use(
    cors({
        origin: ["https://tasq-app.onrender.com", "http://localhost:3000"],
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    })
);

//helps magane cookie-based session
app.use(cookieParser());

//parses request to JSON
app.use(express.json());


//database
const connectDB = require('./db');
connectDB();

//routes
const tasksRoute = require('./routes/tasks');
const authRoute = require('./routes/auth');

app.use('/tasks', tasksRoute);
app.use('/auth', authRoute);

