const express = require("express");

const router = express.Router();
const todos = [];

router.get("/todos", (req, res) => {
  res.render("form", { todos: todos });
});

router.post("/submit", (req, res) => {
  const { title } = req.body;
  const status = req.body.status;

  todos.push({
    title,
    status,
  });

  res.redirect("/todos");
});

router.post("/status", (req, res) => {
  const index = Number(req.body.index);
  const status = req.body.status === "true";

  if (todos[index]) {
    todos[index].status = status;
  }

  res.redirect("/todos");
});

module.exports = router;
