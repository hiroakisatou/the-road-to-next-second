import { initialTickets } from "@/data";
import type { Ticket } from "@/types";

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
    return <div>Ticket not found</div>;
  }
  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.description}</p>
    </div>
  );
};

export default TicketPage;
