require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const {connectDB} =require('./config/db')
const app = express();
const morgan = require('morgan')
const authRouter = require('./routes/auth')

app.use(express.json());
app.use(cookieParser());

//morgan for log on console
app.use(morgan('dev'));
app.use("/app", authRouter)

// Directly call connectDB without promises
connectDB(); 

app.use("/app/check-server", (req, res)=>{
    res.send("Hy checking server")
})

app.listen(4001, ()=>{
    console.log("Server Started on Port 4001");   
})