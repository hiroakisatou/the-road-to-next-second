import type { User } from "@prisma/client";
import { TicketStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { auth } from "@/futures/auth/utils/auth";

const userData = {
  name: "admin",
  email: "admin@example.com",
};

const tickets = [
  {
    title: "Ticket 1",
    description: "This is the first ticket",
    status: TicketStatus.OPEN,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    description: "This is the second ticket.",
    status: TicketStatus.OPEN,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    description: "This is the third ticket.",
    status: TicketStatus.IN_PROGRESS,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
  {
    title: "Ticket 4",
    description: "This is the fourth ticket.",
    status: TicketStatus.DONE,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 699,
  },
  {
    title: "Ticket 5",
    description: "This is the fifth ticket.",
    status: TicketStatus.OPEN,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 299,
  },
  {
    title: "Ticket 6",
    description: "This is the sixth ticket.",
    status: TicketStatus.IN_PROGRESS,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 7",
    description: "This is the seventh ticket.",
    status: TicketStatus.DONE,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 8",
    description: "This is the eighth ticket.",
    status: TicketStatus.OPEN,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
  {
    title: "Ticket 9",
    description: "This is the ninth ticket.",
    status: TicketStatus.IN_PROGRESS,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 699,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB seeding started...");

  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  try {
    await auth.api.signUpEmail({
      body: {
        email: userData.email,
        password: "test1234",
        name: userData.name,
      },
    });

    const createdUser: User | null = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!createdUser) {
      throw new Error(`User ${userData.email} not found`);
    }

    await prisma.ticket.createMany({
      data: tickets.map((ticket) => ({
        ...ticket,
        userId: createdUser.id,
      })),
    });
  } catch (error) {
    console.error(`Error creating user ${userData.email}:`, error);
  }

  const t1 = performance.now();
  console.log(`DB seeding finished in ${t1 - t0} milliseconds`);
};

seed();
