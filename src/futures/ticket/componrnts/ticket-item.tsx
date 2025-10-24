import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteTicket } from "@/futures/ticket/actions";
import { toCurrencyFormCent } from "@/lib/curency";
import { ticketEditPath, ticketPath } from "@/path";
import {
  faArrowUpRightFromSquare,
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

  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span><FontAwesomeIcon icon={TICKET_ICONS[ticket.status]} /></span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className={clsx("whitespace-break-spaces", {
            "line-clamp-3": !isDetail,
          })}>
            {ticket.description}
          </span>
        </CardContent>
        <CardFooter>
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
