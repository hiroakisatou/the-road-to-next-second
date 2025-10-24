"use client";

import { deleteCookiesByKey, getCookiesByKey } from "@/lib/cookies";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const RedirectToast = () => {
  const pathname = usePathname();

  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookiesByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookiesByKey("toast");
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};