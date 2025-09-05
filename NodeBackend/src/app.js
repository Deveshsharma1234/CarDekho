require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const {connectDB} =require('./config/db')
const app = express();
const morgan = require('morgan')
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cors = require('cors');
const carsRouter = require('./routes/cars');
const citiesRouter = require('./routes/cities');
const stateRouter = require('./routes/state');
const districtRouter = require('./routes/district');
const fraudRouter  = require('./routes/fraud');
const listingRouter = require('./routes/listing');
const  reportRouter = require('./routes/report');
const reviewRouter  = require('./routes/review');
const transactionRouter = require('./routes/transaction');
const verificationRouter  = require('./routes/verification');
const wishlistRouter = require('./routes/wishlist');


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
debugger;
app.use("/app", authRouter , userRouter,carsRouter,citiesRouter,districtRouter,stateRouter,fraudRouter,listingRouter,reviewRouter,reviewRouter,reportRouter,transactionRouter,verificationRouter,wishlistRouter)

// Directly call connectDB without promises
connectDB(); 

app.use("/app/check-server", (req, res)=>{
    res.send("Hy checking server")
})

app.listen(4001, ()=>{
    console.log("Server Started on Port 4001");   
})