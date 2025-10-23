import { ActionState, EMPTY_ACTION_STATE } from '@/components/form/action-state-type';
import { FieldError } from '@/components/form/field-error';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { SubmitButton } from '@/components/sujbmit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Ticket } from '@prisma/client';
import { useActionState, useId } from 'react';
import { toast } from 'sonner';
import { upsertTicket } from '../actions';
import { Form } from '@/components/form/form';
import { fromCent } from '@/lib/curency';
type TicketUpsertFormProps = {
  ticket?: Ticket;
}

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const deadlineId = useId();
  const bountyId = useId();

  const handleUpsertTicket = async (prevState: ActionState, formData: FormData) => {
    return upsertTicket(ticket?.id, prevState, formData);
  }

  const [actionState, action, isPending] = useActionState(
    handleUpsertTicket,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor={titleId}>Title</Label>
      <Input id={titleId} name='title' type="text" defaultValue={
        (actionState.payload?.get('title') as string) ?? ticket?.title} />
      <FieldError actionState={actionState} fieldName='title' />

      <Label htmlFor={descriptionId}>Description</Label>
      <Textarea id={descriptionId} name='description' defaultValue={
        (actionState.payload?.get('description') as string) ?? ticket?.description} />
      <FieldError actionState={actionState} fieldName='description' />
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor={deadlineId}>Deadline</Label>
          <Input id={deadlineId} name='deadline' type="date" defaultValue={
            (actionState.payload?.get('deadline') as string) ?? ticket?.deadline} />
          <FieldError actionState={actionState} fieldName='deadline' />
        </div>
        <div className="w-1/2">
          <Label htmlFor={bountyId}>Bounty</Label>
          <Input id={bountyId} name='bounty' type="number" defaultValue={
            (actionState.payload?.get('bounty') as string) ?? (ticket?.bounty ? fromCent(ticket.bounty) : "")} />
          <FieldError actionState={actionState} fieldName='bounty' />
        </div>
      </div>
      
      <SubmitButton label={ticket ? "Edit" : "Create"} isPending={isPending} />
    </Form>
  );
}

export { TicketUpsertForm };
