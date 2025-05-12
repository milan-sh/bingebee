import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"

//It's the rule As early as possible in your application, import and configure dotenv
dotenv.config({
  path: './env'
});

//connecting with database, as this is asynchronous code which eventually return a promise
connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`App listening on port ${process.env.PORT}`)
  })
})
.catch((error)=>{
  console.error("MongoDB connection failed: ", error)
})



//first approach for connecting with database, generally not a good practice
/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
const app = express();
(async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    
    //listener event for tracking app error
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
})();
*/
