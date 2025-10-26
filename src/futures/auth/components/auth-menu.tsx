import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { Link, UserIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const AuthMenu = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const signOutMenu = {
    
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <UserIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={ticketsPath()}>
            <UserIcon className="w-4 h-4" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AuthMenu };