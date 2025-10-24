"use client";

import type { Ticket, TicketStatus } from "@prisma/client";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { updateTicketStatus } from "@/futures/ticket/actions";
import { TICKET_STATUS_LABELS } from "../constant";

type TicketMooreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactElement;
  deleteButton: React.ReactElement;
};

const TicketMooreMenu = ({ ticket, trigger, deleteButton }: TicketMooreMenuProps) => {

  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);

    toast.promise(promise, {
      loading: "updating status...",
    });

    const result = await promise;

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.entries(TICKET_STATUS_LABELS).map(([key, value]) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {value}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {ticketStatusRadioGroupItems}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketMooreMenu };
