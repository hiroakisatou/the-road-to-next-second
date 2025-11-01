import { faBook, faBooks, faUser } from "@awesome.me/kit-2c9d26a98e/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { NavItem } from "@/components/sidebar/types";

import { accountProfilePath, homePath, ticketsPath } from "@/path";


export const NavItems: NavItem[] = [
  {
    title: "All Tickets",
    icon: <FontAwesomeIcon icon={faBooks} size="lg" />,
    href: homePath(),
  },
  {
    title: "My Tickets",
    icon: <FontAwesomeIcon icon={faBook} size="lg" />,
    href: ticketsPath(),
  },
  {
    separator: true,
    title: "Account",
    icon: <FontAwesomeIcon icon={faUser} size="lg" />,
    href: accountProfilePath(),
  }
];