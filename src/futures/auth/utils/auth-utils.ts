"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


import { auth } from "@/futures/auth/utils/auth";
import { notSignInPath } from "@/path";

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
export type User = NonNullable<Session>["user"];

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

const sessionIsActive = async () => {
  const session = await getSession();
  return session !== null;
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
    redirect(notSignInPath());
  }
  return user;
};

export { getCurrentUser, getSession, getUserOrRedirect, sessionIsActive };