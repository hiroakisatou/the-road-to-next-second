import { prisma } from "../../lib/prisma";

const getTickets = async () => {

  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    }
  });
};

const getTicket = async (id: string) => {

  return await prisma.ticket.findUnique({
    where: {
      id,
    },
  });
};

export { getTickets, getTicket };