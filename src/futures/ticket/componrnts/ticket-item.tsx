import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteTicket } from "@/futures/ticket/actions";
import { TicketMooreMenu } from "@/futures/ticket/componrnts/ticket-more-menuju";
import { toCurrencyFormCent } from "@/lib/curency";
import { ticketEditPath, ticketPath } from "@/path";
import {
  faArrowUpRightFromSquare,
  faEllipsisVertical,
  faPencil,
  faTrashCan
} from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ticket } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { TICKET_ICONS } from "../constant";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {

  const handleDelete = async (formData: FormData) => {
    "use server";
    await deleteTicket(ticket.id);
  }

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketPath(ticket.id)} aria-label="view detail" role="button">
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </Link>
    </Button>
  );

  const editButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketEditPath(ticket.id)} aria-label="edit" role="button">
        <FontAwesomeIcon icon={faPencil} />
      </Link>
    </Button>
  );

  const deleteButton = (
    <form action={handleDelete}>
      <Button variant="outline" size="icon" type="submit">
        <FontAwesomeIcon icon={faTrashCan} />
      </Button>
    </form>
  );

  const moreMenu = (
    <TicketMooreMenu
      trigger={
        <Button variant="outline" size="icon" asChild className="p-2">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </Button>
      }
      ticket={ticket}
    />
  );


  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-4 items-center">
            <div className="size-8"><FontAwesomeIcon icon={TICKET_ICONS[ticket.status]} size="2xl"/></div>
            <div className="truncate text-2xl font-semibold">{ticket.title}</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className={clsx("whitespace-break-spaces", {
            "line-clamp-3": !isDetail,
          })}>
            {ticket.description}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between" >
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFormCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {deleteButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
    </div>
  );
};

export { TicketItem };
