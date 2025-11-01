import type { Ticket } from "@prisma/client";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { CardCompact } from "@/components/card-compact";

import { setCookiesByKey } from "@/lib/cookies";

import {  getCurrentUser } from "@/futures/auth/utils/auth-utils";
import { isOwner } from "@/futures/auth/utils/is-owner";
import { Breadcrumbs } from "@/components/breadcrums";
import { TicketUpsertForm } from "@/futures/ticket/componrnts/ticket-upsert-form.";
import { getTicket } from "@/futures/ticket/queries";
import { homePath, ticketPath } from "@/path";
import { Separator } from "@/components/ui/separator";

type EditTicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const EditTicketPage = async ({ params }: EditTicketPageProps) => {
  const { ticketId } = await params;
  const ticket: Ticket | null = await getTicket(ticketId);
  if (!ticket) {
    notFound();
  }
const user = await getCurrentUser();
  if (!user) {
    notFound();
  }
  if (!isOwner(user, ticket)) {
    const referer = (await headers()).get("referer");
    if (referer?.includes("/tickets")) {
      await setCookiesByKey("toast", "You are not the owner of this ticket");
      redirect(referer);
    }
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
      breadcrumbs={[
      { title: "Tickets", href: homePath() },
      {title: ticket.title, href: ticketPath(ticketId)},
      { title: "Edit"},
      ]}
      />
      <Separator />
      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          title="Edit Ticket"
          description="Edit an existing ticket"
          className="w-full max-w-[420px] animate-fade-from-top"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
};

export default EditTicketPage;
