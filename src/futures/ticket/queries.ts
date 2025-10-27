"use server";

import { prisma } from "../../lib/prisma";

type GetTicketsProps = {
  userId?: string;
};
const getTickets = async (
  { userId }: GetTicketsProps
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
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

