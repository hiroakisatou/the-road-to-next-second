
import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { homePath, ticketsPath } from "@/path";
import { ThemeSwitcher } from "./thmes/theme-switcher";
import { faMessageCheck } from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <nav
      className="
          supports-backdrop-blur:bg-background/60
          fixed left-0 right-0 top0 z-20
          border-b bg-background/95 backdrop-blur-2xl
          w-full flex py-2.5 px-4 justify-between
        "
    >
      <div className="flex align-items gapx-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <FontAwesomeIcon icon={faMessageCheck} />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
       </div>
       <div className="flex align-items gapx-2">
        <ThemeSwitcher />
        <Link href={ticketsPath()} className="default">
          Tickets
        </Link>
      </div>
    </nav>
  );
};
export { Header };
