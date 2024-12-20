"use server";

import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email()
    .refine((email) => email.endsWith("@zod.com"), 
      "Only @zod.com emails are allowed"
    ),
  username: z.string().min(USERNAME_MIN_LENGTH, "Username must be at least 5 characters"),
  password: z.string()
    .min(PASSWORD_MIN_LENGTH, "Password must be at least 10 characters")
    .refine((password) => /\d/.test(password), 
      "Password must contain at least one number"
    ),
});

export async function handleLogin(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password')
  } as const;

  const result = loginSchema.safeParse(data);
  
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
      formData: {
        email: data.email,
        username: data.username
      },
      message: null
    };
  } else {
    return {
      success: true,
      fieldErrors: null,
      formData: {
        email: data.email,
        username: data.username
      },
      message: "Welcome back!"
    }
  }
}