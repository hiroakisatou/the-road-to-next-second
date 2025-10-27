"use client";
import { faTrashCan } from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Ticket } from "@prisma/client";
import { useRef } from "react";

import type { ActionState } from "@/components/form/action-state-type";
import { ConfirmDialog } from "@/components/form/hooks/confirm-daialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { deleteTicket } from "@/futures/ticket/actions";
import { TicketMooreMenu } from "@/futures/ticket/componrnts/ticket-more-menu";

type MenuDialogAssociatesProps = {
  ticket: Ticket;
  menuTrigger: React.ReactElement;
};

export type ImperativeHandleFromConfirmDialog = {
  show: () => void;
  hide: () => void;
};

const MenuDialogAssociates = ({
  ticket,
  menuTrigger,
}: MenuDialogAssociatesProps) => {
  const ticketketDleteHandler = async (): Promise<ActionState> => {
    const result = await deleteTicket(ticket.id);
    return result;
  };

  const confirmDialogImperativeHandleRef =
    useRef<ImperativeHandleFromConfirmDialog | null>(null);

  const handleShowConfirmDialog = () => {
    confirmDialogImperativeHandleRef.current?.show();
  };

  const deleteButton = (
    <DropdownMenuItem onClick={handleShowConfirmDialog}>
      <FontAwesomeIcon icon={faTrashCan} />
      <span>Delete</span>
    </DropdownMenuItem>
  );
  return (
    <>
      <ConfirmDialog
        action={ticketketDleteHandler}
        imperativeHandleRef={confirmDialogImperativeHandleRef}
      />
      <TicketMooreMenu
        ticket={ticket}
        trigger={menuTrigger}
        deleteButton={deleteButton}
      />
    </>
  );
};

export { MenuDialogAssociates };
