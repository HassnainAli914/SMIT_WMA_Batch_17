const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/user.route.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(express.json());
app.use('/', router)

app.get("/", (req, res) => {
  res.send({
    Health: "OK",
    port: port,
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
