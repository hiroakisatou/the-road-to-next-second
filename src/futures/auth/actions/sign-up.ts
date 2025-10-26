"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import type { ActionState } from "@/components/form/action-state-type";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";

import { auth } from "@/lib/auth";
import { setCookiesByKey } from "@/lib/cookies";

import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";


const signUpSchema = z.object({
  name: z.string().min(1).max(191).refine(((value) => value.includes(" ")), "username cannot contain spaces"),
  email : z.email({ pattern: z.regexes.email }).min(1, { message: "Email is required" }).max(191, { message: "Email must be at most 191 characters long" }),
  password: z.string().min(6  , { message: "Password must be at least 6 characters long" }).max(191, { message: "Password must be at most 191 characters long" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(191, { message: "Password must be at most 191 characters long" }),
})
  .superRefine(({ password, confirmPassword}, ctx) => {
    if (password !== confirmPassword)  {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const signUp = async (_actionState:ActionState, formData: FormData) => {
  try {
    const { name, email, password } = signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookiesByKey("toast", "Successfully signed up");

  revalidatePath("/", "layout");
  redirect(ticketsPath());

};

export { signUp };
