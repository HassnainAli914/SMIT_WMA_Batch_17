import mongoose from "mongoose";
import { userValidation } from "../validator/user.validator.js";

const userMongoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userMongoSchema.pre("save", async function () {
  const result = userValidation({
    name: this.name,
    email: this.email,
    password: this.password,
  });

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }
});

export const User = mongoose.model("User", userMongoSchema);