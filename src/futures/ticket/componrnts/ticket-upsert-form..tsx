import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Ticket } from '@prisma/client';
import { useActionState, useId } from 'react';
import { upsertTicket } from '../actions';
import { SubmitButton } from '@/components/sujbmit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/action-state-type';
import { ActionState } from '@/components/form/action-state-type';
import { FieldError } from '@/components/form/field-error';

type TicketUpsertFormProps = {
  ticket?: Ticket;
}

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const titleId = useId();
  const descriptionId = useId();

  const handleUpsertTicket = async (prevState: ActionState, formData: FormData) => {
    return upsertTicket(ticket?.id, prevState, formData);
  }

  const [actionState, action, isPending] = useActionState(
    handleUpsertTicket,
    EMPTY_ACTION_STATE,
  );

  return (
    <form
      action={action} className='flex flex-col gap-y-2'>

      <Label htmlFor={titleId}>Title</Label>
      <Input id={titleId} name='title' type="text" defaultValue={
        (actionState.payload?.get('title') as string) ?? ticket?.title} />
      <FieldError actionState={actionState} fieldName='title' />

      <Label htmlFor={descriptionId}>Description</Label>
      <Textarea id={descriptionId} name='description' defaultValue={
        (actionState.payload?.get('description') as string) ?? ticket?.description} />
      <FieldError actionState={actionState} fieldName='description' />

      <SubmitButton label={ticket ? "Edit" : "Create"} isPending={isPending} />
    </form>
  )
}

export { TicketUpsertForm };
