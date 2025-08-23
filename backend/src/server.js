import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/connectDB.js';
import {clerkMiddleware} from '@clerk/express';
import { functions, inngest } from './config/inngest.js';
import { serve } from "inngest/express";

const app = express();

app.use(express.json());
app.use(clerkMiddleware()); // by using this req.auth will be availbale in the req object

app.use("/api/inngest", serve({ client: inngest, functions }));
app.get("/",(req,res)=>{
    res.send("Hello World");
})




const startServer = async () =>{
    try {
        await connectDB();
        if(ENV.NODE_ENV !== "production"){
            app.listen(ENV.PORT,()=>{
                console.log(`Server is running on port ${ENV.PORT}`);
            })
        }
    } catch (error) {
        console.error("Error starting the server")
        process.exit(1);
    }
}

startServer();

export default app;
