import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/path";
import type { Ticket } from "@/types";
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
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.description}</p>
    </div>
  );
};

export default TicketPage;
