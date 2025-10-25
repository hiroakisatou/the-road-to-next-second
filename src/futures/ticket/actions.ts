"use server";

import type { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { ActionState } from "@/components/form/action-state-type";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";

import { setCookiesByKey } from "@/lib/cookies";
import { toCent } from "@/lib/curency";
import { prisma } from "@/lib/prisma";

import { ticketPath, ticketsPath } from "@/path";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(192),
  description: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce.number().positive(),
});

const deleteTicket = async (id: string) => {
try {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });
} catch (error) {
  return fromErrorToActionState(error);
}
  revalidatePath(ticketsPath());
  await setCookiesByKey("toast", "Ticket successfully deleted");
  redirect(ticketsPath());
};

const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: { id: id || "" },
      create: dbData,
      update: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookiesByKey("toast", "Ticket updated");
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created");
};

const updateTicketStatus = async (id: string, status: TicketStatus) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(id));

  return toActionState("SUCCESS", "Ticket status updated");
};

export { deleteTicket, updateTicketStatus, upsertTicket };
