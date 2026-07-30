import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(3, "Name must be atleast 3 chars"),
  email: z.string().trim().email("Invalid Email"),
  password: z.string().min(6, "Pass must be at least 6 chars"),
});

export const userValidation = (data) => userSchema.safeParse(data);
