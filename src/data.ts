import type { Ticket } from "./types";

export const initialTickets: Ticket[] = [
    {
        id: '1',
        title: "Ticket 1",
        description: "This is the first ticket",
        status: "DONE",
    },
    {
        id: '2',
        title: "Ticket 2",
        description: "This is the second ticket.",
        status: "OPEN",
    },
];