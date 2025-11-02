import { Suspense } from "react";

import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";

import { TicketList } from "@/futures/ticket/componrnts/ticket-list";
import type { FilterAndOrderParams } from "@/futures/ticket/types";

type HomePageProps = {
  searchParams: Promise<FilterAndOrderParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="All TIcket" description="Tickets by enveryone at one place" />


      <Suspense fallback={<Spinner />}>
        <TicketList filter={await searchParams} />
      </Suspense>
    </div>
  );
};

export default HomePage;
