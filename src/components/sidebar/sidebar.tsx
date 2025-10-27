"use client";

import { useState } from "react";

import { NavItems } from "@/components/sidebar/constants";
import { SidebarItem } from "@/components/sidebar/sidebar-item";

import { cn } from "@/lib/utils";

type SidebarProps = {
  isLoggedIn: boolean;
};

const Sidebar =  ({ isLoggedIn }: SidebarProps) => {

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
        "animated-sidebar-left",
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "w-[78px] md:w-60" : "w-[78px]"
      )}
      onMouseEnter={() => handleTogle(true)}
      onMouseLeave={() => handleTogle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {NavItems.map((navItem) => (
            <SidebarItem key={navItem.title} navItem={navItem} isOpen={isOpen} />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export { Sidebar };
