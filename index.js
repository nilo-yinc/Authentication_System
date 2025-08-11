import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";

//import aall routes

import userRoutes from "./routes/user.routes.js";



dotenv.config();

    cors({
   
const app = express();
app.use( origin:process.env.BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE",'OPTION'],
    allowedHeaders:["Content-Type","Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const port = process.env.port || 3000; // 4000,5000 ,used usally 

app.get("/", (req, res) => {
  res.send("Cohort!");
});
app.get("/", (req, res) => {
  res.send("Hites");
});

app.get("/piyush",(req,res)=> {
    res.send("Piyush");
});

// connect to db
db();

//user routes
app.use("/api/v1/user", userRoutes);




app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${port}`);
});
