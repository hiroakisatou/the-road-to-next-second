import { faMessageCheck } from "@awesome.me/kit-2c9d26a98e/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { getSession } from "@/futures/auth/actions/get-session";
import { signOut } from "@/futures/auth/actions/sign-out";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/path";
import { ThemeSwitcher } from "./thmes/theme-switcher";
import { Button, buttonVariants } from "./ui/button";

const Header = async () => {

    const session = await getSession();

    const navItems = session ? (
      <>
      <form action={signOut}>
        <Button type="submit" variant="outline">Sing out</Button>
      </form>
      <Link href={ticketsPath()} className={buttonVariants({ variant: "outline"})}>
        Tickets
      </Link>
      </>
    ) : (
      <>
      <Link href={signInPath()} className={buttonVariants({ variant: "outline"})}>
        Sign In
      </Link>
      <Link href={signUpPath()} className={buttonVariants({ variant: "default"})}>
        Sign Up
      </Link>
      </>
    );

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
        <div className="flex align-items-center justify-center gap-x-2">{navItems}</div>
      </div>
    </nav>
  );
};
export { Header };
