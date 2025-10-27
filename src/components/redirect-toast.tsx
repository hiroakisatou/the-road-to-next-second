"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { deleteCookiesByKey, getCookiesByKey } from "@/lib/cookies";

export const RedirectToast = () => {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: this dependency is intentional
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
