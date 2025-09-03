require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const {connectDB} =require('./config/db')
const app = express();
const morgan = require('morgan')
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cors = require('cors')


app.use(
    cors({
        origin: "http://localhost:5173", // frontend origin
        credentials: true,               // allow cookies & headers
    })
);
app.use(express.json());
app.use(cookieParser());

//morgan for log on console
app.use(morgan('dev'));
app.use("/app", authRouter , userRouter)

// Directly call connectDB without promises
connectDB(); 

app.use("/app/check-server", (req, res)=>{
    res.send("Hy checking server")
})

app.listen(4001, ()=>{
    console.log("Server Started on Port 4001");   
})