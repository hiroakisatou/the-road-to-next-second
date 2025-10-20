import { Heading } from "@/components/heading";
import { TicketList } from "@/futures/ticket/componrnts/ticket-list";
import { Spinner } from "@/components/spinner";
import { Suspense } from "react";

const TicketsPage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
    <Suspense fallback={<Spinner />}>
      <TicketList />
    </Suspense>
    </div>
  );
};
export default TicketsPage;
