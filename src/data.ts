import type { Ticket } from "./futures/ticket/types";

export const initialTickets: Ticket[] = [
    {
        id: '1',
        title: "Ticket 1",
        description: "This is the first ticket",
        status: "DONE" as const,
    },
    {
        id: '2',
        title: "Ticket 2",
        description: "This is the second ticket.",
        status: "OPEN" as const,
    },
    {
        id: '3',
        title: "Ticket 3",
        description: "This is the third ticket.",
        status: "IN_PROGRESS" as const,
    },
    {
        id: '4',
        title: "Ticket 4",
        description: "This is the fourth ticket.",
        status: "DONE" as const,
    },
    {
        id: '5',
        title: "Ticket 5",
        description: "This is the fifth ticket.",
        status: "OPEN" as const,
    },
];