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
const { initializeCronJobs } = require('./tasks/cron');
const path = require('path');
const filterRouter = require('./routes/filter');


app.use(
    cors({
        origin:[ "http://192.168.3.111:3000", "http://localhost:5173"] ,// frontend origin
        credentials: true,               // allow cookies & headers
    })
);
app.use(express.json());
app.use(cookieParser());

//morgan for log on console
app.use(morgan('dev'));
// app.use("/app", authRouter , userRouter)

app.use("/app", authRouter , userRouter,carsRouter,citiesRouter,districtRouter,stateRouter,fraudRouter,listingRouter,reviewRouter,reportRouter,transactionRouter,verificationRouter,wishlistRouter,filterRouter)
app.use('/app/reports', express.static(path.join(__dirname, 'reports')));
app.use('/app/uploads', express.static(path.join(__dirname, 'uploads')));
// connectDB(); 

initializeCronJobs();
app.use("/app/check-server", (req, res)=>{
    res.send("Hy checking server")
})

app.listen(4001, ()=>{
    console.log("Server Started on Port 4001");   
})