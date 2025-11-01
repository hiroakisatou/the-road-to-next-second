import { faLock, faRightFromBracket, faUser } from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { signOut } from "@/futures/auth/actions/sign-out";
import type { User } from "@/futures/auth/utils/auth-utils";
import { accountPasswordPath, accountProfilePath } from "@/path";

type AccountDropdownProps = {
  user: User;
};

const AccountDropdown = ({ user }: AccountDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar className={buttonVariants({ variant: 'outline' })}>
          <AvatarFallback >
            {user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={accountProfilePath()} className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            <div>Profile</div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={accountPasswordPath()} className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLock} />
            <div>Password</div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form action={signOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AccountDropdown };
