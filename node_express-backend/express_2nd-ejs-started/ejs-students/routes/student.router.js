const express = require("express");

const studentRouter = express.Router();
const students = [];

studentRouter.get("/students", (req, res) => {
  res.render("form", { students: students });
});

studentRouter.post("/submit", (req, res) => {
  const { name, age, roll, course } = req.body;
  students.push({
    name: name,
    age: age,
    roll: roll,
    course: course,
  });
  res.redirect("/students");
});

studentRouter.post("/delete", (req, res) => {
  const { index } = req.body;
  students.splice(index, 1);
  console.log(students);
  res.redirect("/students");
});

module.exports = studentRouter;
