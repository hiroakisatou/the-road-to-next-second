import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/futures/ticket/componrnts/ticket-upsert-form.";
import { getTicket } from "@/futures/ticket/queries";
import { Ticket } from "@prisma/client";
import { notFound } from "next/navigation";

type EditTicketPageProps = {
  params: Promise<{
    ticketId: string
  }>;
};

const EditTicketPage = async ({ params }: EditTicketPageProps) => {
  const { ticketId } = await params;
  const ticket:Ticket | null = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};

export default EditTicketPage;