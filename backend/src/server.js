import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/connectDB.js';

const app = express();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(ENV.PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${ENV.PORT}`);
})
