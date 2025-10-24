"use server";

import { cookies } from "next/headers";

export const getCookiesByKey = async (key: string) => {
  const cookie = (await cookies()).get(key);

  if (!cookie) {
    return null;
  }

  return cookie.value;
};

export const setCookiesByKey = async (key: string, value: string) => {
  (await cookies()).set(key, value);
};

export const deleteCookiesByKey = async (key: string) => {
  (await cookies()).delete(key);
};
