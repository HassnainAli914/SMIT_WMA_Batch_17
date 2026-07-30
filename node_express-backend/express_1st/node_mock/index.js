import dotenv from "dotenv";
import express from "express";
import connectDatabase from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

try {
  if (connectDatabase()) {
    app.get("/", (req, res) => {
      res.send({
        Database: "Connected Successfully",
      });
    });
  }
} catch (error) {
    console.log(error.message);
    
}

app.get("/user", (req, res) => {
  res.send({
    name: "Hassnain Ali",
    age: "17",
    email: "hassnain@gmail.com",
  });
});

// app.use("/user",)

app.listen(port, (req, res) => {
  console.log(`Backend is running on Port: ${port}`);
});
