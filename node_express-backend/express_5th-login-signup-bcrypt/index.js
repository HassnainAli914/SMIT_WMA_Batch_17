const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express()
const port = process.env.PORT || 8000;

app.set(express.json())

express.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
