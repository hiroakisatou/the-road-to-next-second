import { LucideKanban } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { ticketsPath } from "@/path";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()} className="default">
          View all tickets
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
