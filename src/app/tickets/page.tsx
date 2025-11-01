import { Suspense } from "react";

import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";

import { getUserOrRedirect } from "@/futures/auth/utils/auth-utils";
import { TicketList } from "@/futures/ticket/componrnts/ticket-list";
import { TicketUpsertForm } from "@/futures/ticket/componrnts/ticket-upsert-form.";
import type { SearchFilterParams } from "@/futures/ticket/types";

type TicketsPageProps = {
  searchParams: Promise<SearchFilterParams>;
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const user = await getUserOrRedirect();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will b e created"
        className="w-full max-w-[420px] self-center animate-fade-from-top"
        content={<TicketUpsertForm />}
      />
      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} filter={await searchParams} />
      </Suspense>
    </div>
  );
};
export default TicketsPage;
