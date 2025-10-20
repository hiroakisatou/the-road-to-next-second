import { LucideKanban } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { homePath, ticketsPath } from "@/path";

const Header = () => {
  return (
    <nav
      className="
          supports-backdrop-blur:bg-background/60
          fixed left-0 right-0 top0 z-20
          border-b bg-background/95 backdrop-blur-2xl
          w-full flex py-2.5 px-4 justify-between
        "
    >
      <div>
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div>
        <Link href={ticketsPath()} className="default">
          Tickets
        </Link>
      </div>
    </nav>
  );
};
export { Header };
