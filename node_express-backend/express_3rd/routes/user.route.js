const express = require("express");

const router = express.router();

router.post("/signup", (req, res) => {
    res.send('User Signup Successfully!')
});
router.post("/login", (req, res) => {
    res.send('User Login Successfully!')
});
