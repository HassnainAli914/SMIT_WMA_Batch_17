const express = require("express");
const dotenv = require("dotenv");
const studentRouter = require("./routes/student.router.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", "./views");

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/', studentRouter)

app.get("/", (req, res) => {
  res.send({
    backend: "Healthy",
    port: port,
  });
});

app.listen(port, () => {
  console.log(`Backend running on port: ${port}`);
});
