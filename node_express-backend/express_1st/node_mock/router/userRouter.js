import express from "express";
import { userData } from "../controller/userController";

export const router = express.Router();

router.get("/user", userData);
