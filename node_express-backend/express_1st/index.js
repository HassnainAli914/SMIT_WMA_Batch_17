import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./configs/db.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send({
    database: "Connected Successfully",
  });
});

const port = process.env.PORT || 600;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error.message);
    process.exit(1);
  });
