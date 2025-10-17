type Ticket = {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "DONE";
};

export type { Ticket };