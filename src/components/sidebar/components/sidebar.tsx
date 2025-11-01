"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { SidebarItem } from "@/components/sidebar/components/sidebar-item";
import { NavItems } from "@/components/sidebar/constants";

import { cn } from "@/lib/utils";

import { getActivePath } from "@/futures/auth/utils/get-active-path";
import { signInPath, signUpPath } from "@/path";

type SidebarProps = {
  isLoggedIn: boolean;
};

const Sidebar =  ({ isLoggedIn }: SidebarProps) => {
  const pathName = usePathname();

  const { activeIndex } = getActivePath(
    pathName,
    NavItems.map((item) => item.href),
    [signInPath(), signUpPath()],
  );

 const [isTransition, setTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleTogle = (open: boolean) => {
    setTransition(true);
    setIsOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  if (!isLoggedIn) {
    return <div className="w-[78px] bg-secondary/20" />;
  }
  return (
    <aside
      className={cn(
        "animate-sidebar-left",
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "w-[78px] md:w-60" : "w-[78px]"
      )}
      onMouseEnter={() => handleTogle(true)}
      onMouseLeave={() => handleTogle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {NavItems.map((navItem, index) => (
            <SidebarItem
            key={navItem.title}
            navItem={navItem}
            isOpen={isOpen}
            isActive={index === activeIndex}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export { Sidebar };
