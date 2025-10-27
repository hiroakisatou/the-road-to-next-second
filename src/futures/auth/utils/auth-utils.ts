"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { setCookiesByKey } from "@/lib/cookies";

import { auth } from "@/futures/auth/utils/auth";
import { signInPath } from "@/path";

const getSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};

const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

const getUserOrRedirect = async () => {
  const user = await getCurrentUser();
  if (!user) {
    await setCookiesByKey("toast", "You need to be signed in to access this page");
    redirect(signInPath());
  }
  return user;
};

export { getCurrentUser, getSession, getUserOrRedirect };
