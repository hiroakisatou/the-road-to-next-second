"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { setCookiesByKey } from "@/lib/cookies";

import { auth } from "@/futures/auth/utils/auth";
import { homePath } from "@/path";

const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
  await setCookiesByKey("toast", "Successfully signed out");
  revalidatePath("/", "layout");
  redirect(homePath());
};

export { signOut };
