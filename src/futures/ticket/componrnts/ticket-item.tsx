import {
  faArrowUpRightFromSquare,
  faEllipsisVertical,
  faPencil,
} from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toCurrencyFormCent } from "@/lib/curency";

import { getCurrentUser } from "@/futures/auth/utils/auth-utils";
import { isOwner } from "@/futures/auth/utils/is-owner";
import { MenuDialogAssociates } from "@/futures/ticket/componrnts/menu-dialog-associates";
import type { TicketWithUser } from "@/futures/ticket/types";
import { ticketEditPath, ticketPath } from "@/path";
import { TICKET_ICONS } from "../constant";

type TicketItemProps = {
  ticket: TicketWithUser;
  isDetail?: boolean;
};

const TicketItem = async({ ticket, isDetail }: TicketItemProps) => {
    const user = await getCurrentUser();
    let isTicketOwner = false;

    if (user) {
      isTicketOwner = await isOwner(user, ticket);
    }

  const detailButton = user ? (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketPath(ticket.id)} aria-label="view detail" role="button">
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </Link>
    </Button>
  ) : null;
  const editButton = isTicketOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketEditPath(ticket.id)} aria-label="edit" role="button">
        <FontAwesomeIcon icon={faPencil} />
      </Link>
    </Button>
  ) : null;

  const moreMenu = isTicketOwner ? (
    <MenuDialogAssociates
      menuTrigger={
        <Button variant="outline" size="icon" asChild className="p-2">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </Button>
      }
      ticket={ticket}
    />
  ) : null;

  return (
    <div
      className={clsx("w-full flex gap-x-1 flex-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-4 items-center">
            <div className="size-8">
              <FontAwesomeIcon icon={TICKET_ICONS[ticket.status]} size="2xl" />
            </div>
            <div className="truncate text-2xl font-semibold">
              {ticket.title}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.description}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {ticket.deadline} by {ticket.user.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFormCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
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
