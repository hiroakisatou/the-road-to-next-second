"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { ActionState } from "@/components/form/action-state-type";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";

import { setCookiesByKey } from "@/lib/cookies";

import { auth } from "@/futures/auth/utils/auth";
import { ticketsPath } from "@/path";

const signInSchema = z.object({
  email: z.email().min(1, { message: "Email is required" }).max(191),
  password: z.string().min(6).max(191),
});

const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookiesByKey("toast", "Successfully signed in");

  revalidatePath("/", "layout");
  redirect(ticketsPath());
};

export { signIn };
