"use client";

import { faBug } from "@awesome.me/kit-2c9d26a98e/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Placeholder } from "@/components/placeholder";

export default function Error({ error }: { error: Error }) {
  return (
    <Placeholder
      label="Something weng wrong. Please try again later."
      icon={<FontAwesomeIcon icon={faBug} size="5x" />}
    />
  );
}
