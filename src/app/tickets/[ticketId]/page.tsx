import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrums";
import { Separator } from "@/components/ui/separator";

import { TicketItem } from "@/futures/ticket/componrnts/ticket-item";
import { getTicket } from "@/futures/ticket/queries";
import type { TicketWithUser } from "@/futures/ticket/types";
import { homePath } from "@/path";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket: TicketWithUser | null = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
      breadcrumbs={[
       { title: "Tickets", href: homePath() },
       {title: ticket.title},
      ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
};

export default TicketPage;
