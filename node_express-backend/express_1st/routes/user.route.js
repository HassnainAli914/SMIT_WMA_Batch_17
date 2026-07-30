import express from "express";
import { User } from "../schemas/user.schema.js";
import { userValidation } from "../validator/user.validator.js";

const router = express.Router();

// GET form page
router.get("/form", async (req, res) => {
  try {
    const users = await User.find();
    res.render("form", { users });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST create a new user
router.post("/", async (req, res) => {
  const result = userValidation(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }

  try {
    const newUser = new User(result.data);
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;