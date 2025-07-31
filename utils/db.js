import { url } from "inspector";
import mongoose from "mongoose";

import dotenv from "dotenv";

// export a function that connect to dp

const db = () =>{
    mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log("Error connecting to mongodb");
})
}

export default db;

