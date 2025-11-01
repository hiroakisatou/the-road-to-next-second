import Link from "next/link";

import type { NavItem } from "@/components/sidebar/types";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

type SidebarItemProps = {
  isOpen: boolean;
  isActive: boolean;
  navItem: NavItem;
};

const SidebarItem = ({ isOpen, isActive, navItem }: SidebarItemProps) => {

  const closedClassName = `
    text-background opacity-0, transition-all
    duration-300 group-hover:z-40 group-hover:ml-4
    group-hover:rounded group-hover:bg-foreground
    group-hoever:p-2 group-hover:opacity-100`;

  return (
    <>
    {navItem.separator && <Separator />}
    <Link href={navItem.href}

      className={cn(
        buttonVariants({ variant: "ghost" }),
        "group relative flex h-12 justify-start",
        isActive && "bg-white/70 font-bold hover:bg-white/70",
      )}
    >
      {navItem.icon}
      <span
        className={cn(
          "absolute left-12 text-base duration-200",
          isOpen ? "hidden md:block" : "hidden",
          !isOpen && closedClassName,
        )}
        >
          {navItem.title}
        </span>
    </Link>
    </>
  );
};
export { SidebarItem };
