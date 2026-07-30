const express = require("express");

const router = express.Router();
const users = [];

router.get("/form", (req, res) => {
  res.render("form", { users: users });
});

router.post("/submit", (req, res) => {
  const { username, email, password } = req.body;
  users.push({
    username: username,
    email: email,
    password: password,
  });
  console.log(users);
  res.redirect("/form");
});

router.post("/delete", (req, res) => {
  const { index } = req.body;
  users.splice(index, 1);
  console.log(users);
  res.redirect("/form");
});

module.exports = router;
