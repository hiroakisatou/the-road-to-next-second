import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/futures/auth/utils/auth";

export const { GET, POST } = toNextJsHandler(auth);
