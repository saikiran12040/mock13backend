const express=require("express");
const cors=require("cors");
const { connection } = require("./Configue/db");
const { loginRouter } = require("./Routes/login.route");
const { signRouter } = require("./Routes/signup.route");
const { blogRouter } = require("./Routes/blogs.route");


const app=express();

app.use(cors());
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hi")
})

app.use("/api/register",signRouter);
app.use("/api/login",loginRouter);
app.use("/api/blog",blogRouter)


app.listen(8080,async(req,res)=>{
    try {
        await connection;
        console.log("Connected to DB Succesfully")
    } catch (error) {
        console.log(error,"err");
        console.log("Failed to Connect DB")
    }
})