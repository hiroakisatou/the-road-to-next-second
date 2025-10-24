"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { faTrashCan } from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ticket, TicketStatus } from "@prisma/client";
import { TICKET_STATUS_LABELS } from "../constant";
import { updateTicketStatus } from "@/futures/ticket/actions";
import { toast } from "sonner";


type TicketMooreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactElement;
}

const TicketMooreMenu = ({ ticket, trigger }: TicketMooreMenuProps) => {

  const deleteButton = (
    <DropdownMenuItem>
      <FontAwesomeIcon icon={faTrashCan} />
      <span>Delete</span>
    </DropdownMenuItem>
  );

  const handleUpdateTicketStatus = async (value: string) => {
    const result = await updateTicketStatus(ticket.id, value as TicketStatus);

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
      {Object.entries(TICKET_STATUS_LABELS).map(([key, value]) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {value}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    );



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {ticketStatusRadioGroupItems}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketMooreMenu };