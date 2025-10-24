"use client";

import { useImperativeHandle, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import type { ImperativeHandleFromConfirmDialog } from "@/futures/ticket/componrnts/menu-dialog-associates";

type UseConfirmDialogArgs = {
  title?: string;
  description?: string;
  action: (payload: FormData) => void;
  trigger?: React.ReactElement;
  imperativeHandleRef: React.RefObject<ImperativeHandleFromConfirmDialog | null>;
};

const ConfirmDialog = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand the consqquences.",
  action,
  trigger,
  imperativeHandleRef
}: UseConfirmDialogArgs) => {
  const [isOpen, setIsOpen] = useState(false);


  useImperativeHandle(imperativeHandleRef, () => ({
    show: () => {
      setIsOpen(true);
    },
    hide: () => {
      setIsOpen(false);
    },
  }));

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={action}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ConfirmDialog };
