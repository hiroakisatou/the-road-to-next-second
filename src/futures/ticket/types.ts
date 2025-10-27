import type { Prisma } from "@prisma/client";

export type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    user: {
      select: { name: true };
    };
  };
}>;
