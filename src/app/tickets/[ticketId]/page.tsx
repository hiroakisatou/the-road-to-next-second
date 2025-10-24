import type { Ticket } from "@prisma/client";
import { notFound } from "next/navigation";

import { TicketItem } from "@/futures/ticket/componrnts/ticket-item";
import { getTicket } from "@/futures/ticket/queries";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket: Ticket | null = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }
  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
