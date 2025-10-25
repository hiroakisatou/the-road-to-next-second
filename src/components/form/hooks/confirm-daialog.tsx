"use client";

import { useActionState, useImperativeHandle, useState } from "react";

import { type ActionState, EMPTY_ACTION_STATE } from "@/components/form/action-state-type";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/sujbmit-button";
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

import type { ImperativeHandleFromConfirmDialog } from "@/futures/ticket/componrnts/menu-dialog-associates";

type UseConfirmDialogArgs = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
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

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const [actionState, formAction, isPending] = useActionState(action, EMPTY_ACTION_STATE);
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
            <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
              >
              <SubmitButton label="confirm" isPending={isPending}/>
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ConfirmDialog };
