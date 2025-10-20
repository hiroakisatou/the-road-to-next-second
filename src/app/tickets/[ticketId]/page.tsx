import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { TicketItem } from "@/futures/ticket/componrnts/ticket-item";
import type { Ticket } from "@/futures/ticket/types";
import { ticketsPath } from "@/path";
import { Link } from "lucide-react";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = initialTickets.find(
    (ticket: Ticket) => ticket.id === ticketId
  );

  if (!ticket) {
    return (
      <Placeholder
       label="Ticket not found"
       button={
         <Button asChild variant="outline" aria-label="go to tickets" role="link">
            <Link href={ticketsPath()}>Go to Tickets</Link>
         </Button>
       }
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
