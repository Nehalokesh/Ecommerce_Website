const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserRouter = require('./router/userRoute');
const cors = require('cors');
const connectDatabase = require('./utils/database')

const app = express();

app.use(express.json());
connectDatabase(); // connect database
app.use(cors())
// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(UserRouter);

let PORT = 3000;
app.listen(PORT,(err)=>{
    if(err){
        console.log(`sever failed to listen on port ${PORT} `);
    }else{
        console.log(`server listening on port ${PORT}`)
    }
})






