import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { TicketItem } from "@/futures/ticket/componrnts/ticket-item";
import { getTicket } from "@/futures/ticket/queries";
import type { Ticket } from "@/futures/ticket/types";
import { ticketsPath } from "@/path";
import Link from "next/link";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {

  const { ticketId } = await params;
  const ticket:Ticket | null = await getTicket(ticketId);


  if (!ticket) {
    return (
      <Placeholder
       label="Ticket not found"
       button={(
         <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go to Tickets</Link>
         </Button>
       )}

       />
    );
  }
  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
