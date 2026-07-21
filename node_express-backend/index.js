import dotenv from "dotenv";
import express from "express";
import connectDatabase from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

connectDatabase()

app.get("/", (req, res) => {
    res.send(new Date())
});

app.get("/user", (req, res) => {
    res.send({
        name: "Hassnain Ali",
        age: "17",
        email: "hassnain@gmail.com",
    })
});

// app.use("/user",)

app.listen(port, (req, res) => {
  console.log(`Backend is running on Port: ${port}`);
});
