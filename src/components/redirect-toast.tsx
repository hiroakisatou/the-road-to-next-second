"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookiesByKey, getCookiesByKey } from "@/actiohns/cookies";

export const RedirectToast = () => {
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookiesByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookiesByKey("toast");
      }
    };

    showCookieToast();
  }, []);

  return null;
};