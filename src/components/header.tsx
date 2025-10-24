import { faMessageCheck } from "@awesome.me/kit-2c9d26a98e/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { ThemeSwitcher } from "./thmes/theme-switcher";
import { Button } from "./ui/button";
import { homePath, ticketsPath } from "@/path";

const Header = () => {
  return (
    <nav
      className="
          supports-backdrop-blur:bg-background/60
          fixed left-0 right-0 top0 z-20
          border-b bg-background/95 backdrop-blur-2xl
          w-full flex py-2.5 px-4 justify-between items-center
        "
    >
      <div className="flex align-items gapx-2">
        <Link
          href={homePath()}
          className="flex align-items justify-center gap-x-2"
        >
          <div className="text-secondary">
            <FontAwesomeIcon icon={faMessageCheck} className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-semibold text-secondary">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex align-items-center justify-center gap-x-2">
        <ThemeSwitcher />
        <Button variant="default" asChild>
          <Link href={ticketsPath()}>Tickets</Link>
        </Button>
      </div>
    </nav>
  );
};
export { Header };
