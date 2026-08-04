const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const router = require("./routes/todo.router.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

app.get("/", (req, res) => {
  res.json({
    backend: "Healthy",
    port,
  });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Backend running on port: ${port}`);
  });
}

module.exports = app;
