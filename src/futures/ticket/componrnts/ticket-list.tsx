import { Suspense } from "react";

import { SearchInput } from "@/components/sidebar/components/search-input";
import { SortSelect } from "@/components/sort-select";
import { Spinner } from "@/components/spinner";

import type { FilterAndOrderParams } from "@/futures/ticket/types";
import { getTickets } from "../queries";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string;
  filter: FilterAndOrderParams;
};

const TicketList = async ({ userId, filter }: TicketListProps) => {
  const tickets = await getTickets({ userId, filter});
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <Suspense fallback={<Spinner />}>
        <div className="w-full max-w-[420px] flex flex-1 items-start fy-center gap-x-2">
          <SearchInput placeholder="Input search term" />
           <SortSelect defaultValue="newest" options={[{ value: "newest",  label: "Newest" }, { value: "bounty", label: "Bounty" }]} />
        </div>
      </Suspense>
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
    </div>
  );
};

export { TicketList };
