import { PrismaClient, TicketStatus } from '@prisma/client'
const prisma = new PrismaClient();


const tickets =  [
    {
        title: "Ticket 1",
        description: "This is the first ticket",
        status: TicketStatus.OPEN,
    },
    {
        title: "Ticket 2",
        description: "This is the second ticket.",
        status: TicketStatus.OPEN,
    },
    {
        title: "Ticket 3",
        description: "This is the third ticket.",
        status: TicketStatus.IN_PROGRESS,
    },
    {
        title: "Ticket 4",
        description: "This is the fourth ticket.",
        status: TicketStatus.DONE,
    },
    {
        title: "Ticket 5",
        description: "This is the fifth ticket.",
        status: TicketStatus.OPEN,
    },
    {
        title: "Ticket 6",
        description: "This is the sixth ticket.",
        status: TicketStatus.IN_PROGRESS,
    },
    {
        title: "Ticket 7",
        description: "This is the seventh ticket.",
        status: TicketStatus.DONE,
    },
    {
        title: "Ticket 8",
        description: "This is the eighth ticket.",
        status: TicketStatus.OPEN,
    },
    {
        title: "Ticket 9",
        description: "This is the ninth ticket.",
        status: TicketStatus.IN_PROGRESS,
    }
  ];

  const seed = async () => {
    const t0 = performance.now();
    console.log("DB seeding started...");

    await prisma.ticket.deleteMany();

    await prisma.ticket.createMany({
      // @ts-ignore
      data: tickets,
    });

    const t1 = performance.now();
    console.log(`DB seeding finished in ${t1 - t0} milliseconds`);
  };

  seed();