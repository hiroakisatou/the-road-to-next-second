import { initialTickets } from "@/data";
import { Ticket } from "./types";

const getTickets = async (): Promise<Ticket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return new Promise((resolve) => {
    resolve(initialTickets);
  });
};

const getTicket = async (id: string): Promise<Ticket | null> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const maybeTicket = initialTickets.find((ticket) => ticket.id === id);

  return new Promise((resolve) => {
    resolve(maybeTicket || null);
  });
};

export { getTickets, getTicket }