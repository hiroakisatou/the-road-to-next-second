import { headers } from "next/headers";

import { auth } from "@/lib/auth";

const getSession = async () => {
  "use server";

  const session = await auth.api.getSession({
    headers: await headers()
  });

  return session;
};

export { getSession };
