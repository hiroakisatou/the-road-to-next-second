type Ticket = {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "IN_PPROGRESS" | "DONE";
};

export type { Ticket };