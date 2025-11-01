import { Suspense } from "react";

import { SearchInput } from "@/components/sidebar/components/search-input";
import { Spinner } from "@/components/spinner";

import { getTickets } from "../queries";
import { TicketItem } from "./ticket-item";
import type { SearchFilterParams } from "@/futures/ticket/types";

type TicketListProps = {
  userId?: string;
  filter: SearchFilterParams;
};

const TicketList = async ({ userId, filter }: TicketListProps) => {
  const tickets = await getTickets({ userId, filter});
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <Suspense fallback={<Spinner />}>
        <div className="w-full max-w-[420px]">
          <SearchInput placeholder="Input search term" />
        </div>
      </Suspense>
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
