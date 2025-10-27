import Link from "next/link";

import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";

import { signInPath } from "@/path";

export default function NotFound() {
  return (
    <Placeholder
      label="You should be signed in to access this page"
      button={
        <Button asChild variant="outline">
          <Link href={signInPath()}>Go to Sign In</Link>
        </Button>
      }
    />
  );
}