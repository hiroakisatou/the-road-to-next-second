"use client";

import type { Ticket } from "@prisma/client";
import { useActionState, useId, useRef } from "react";


import {
  DatePicker,
  type ImperativeHandleFromDatePicker,
} from "@/components/date-picker";
import {
  type ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/action-state-type";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/sujbmit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {  fromCentToTwoDecimalPlaces } from "@/lib/curency";

import { upsertTicket } from "../actions";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const deadlineId = useId();
  const bountyId = useId();

  const handleUpsertTicket = async (
    prevState: ActionState,
    formData: FormData,
  ) => {
    return upsertTicket(ticket?.id, prevState, formData);
  };

  const [actionState, action, isPending] = useActionState(
    handleUpsertTicket,
    EMPTY_ACTION_STATE,
  );

  const datePcikerImperativeHandleRef =
    useRef<ImperativeHandleFromDatePicker>(null);

  const handleSuccess = () => {
    datePcikerImperativeHandleRef.current?.reset();
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Label htmlFor={titleId}>Title</Label>
      <Input
        id={titleId}
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title ?? ""
        }
      />
      <FieldError actionState={actionState} fieldName="title" />

      <Label htmlFor={descriptionId}>Description</Label>
      <Textarea
        id={descriptionId}
        name="description"
        defaultValue={
          (actionState.payload?.get("description") as string) ??
          ticket?.description ??
          ""
        }
      />
      <FieldError actionState={actionState} fieldName="description" />
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor={deadlineId}>Deadline</Label>
          <DatePicker
            id={deadlineId}
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline ??
              ""
            }
            imeprativeHandleRef={datePcikerImperativeHandleRef}
          />
          <FieldError actionState={actionState} fieldName="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor={bountyId}>Bounty ($)</Label>
          <Input
            id={bountyId}
            name="bounty"
            type="number"
            step="0.01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCentToTwoDecimalPlaces(ticket.bounty) : "")
            }
          />
          <FieldError actionState={actionState} fieldName="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? "Edit" : "Create"} isPending={isPending} />
    </Form>
  );
};

export { TicketUpsertForm };
