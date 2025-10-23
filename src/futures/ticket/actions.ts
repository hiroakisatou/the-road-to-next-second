'use server';

import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { ActionState } from "@/components/form/action-state-type";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(192),
  description: z.string().min(1).max(1024),
});

const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });
  redirect(ticketsPath());
};

// create ticket action is change to include upsert func
// const createTicket = async (formData: FormData) => {
//   const data = {
//     title: formData.get('title'),
//     description: formData.get('description'),
//   };

//   await prisma.ticket.create({
//     data: {
//       title: data.title as string,
//       description: data.description as string,
//     },
//   });

//   revalidatePath(ticketsPath());
// }

const upsertTicket = async (
  id: string | undefined,
  prevState: ActionState,
  formData: FormData,
) => {
  try {
  const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
    });

  await prisma.ticket.upsert({
    where: { id: id || '' },
    create: data,
    update: data,
  });
} catch (error) {
  return fromErrorToActionState(error, formData);
}

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created");
}


export { deleteTicket, upsertTicket };