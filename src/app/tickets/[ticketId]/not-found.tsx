import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/path";
import Link from "next/link";
import { Placeholder } from "@/components/placeholder";

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={(
        <Button asChild variant="outline">
          <Link href={ticketsPath()}>Go to Tickets</Link>
        </Button>
      )}
    />
  )
}