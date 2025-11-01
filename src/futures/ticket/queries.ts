"use server";

import type { SearchFilterParams } from "@/futures/ticket/types";
import { prisma } from "../../lib/prisma";

type GetTicketsProps = {
  userId?: string;
  filter: SearchFilterParams;
};
const getTickets = async (
  { userId, filter }: GetTicketsProps
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      ...filter.q && {
        title: {
          contains: filter.q,
          mode: "insensitive",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

const getTicket = async (id: string) => {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

export { getTicket, getTickets };

