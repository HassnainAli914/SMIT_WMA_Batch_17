const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Backend running on Port 8000')
});
