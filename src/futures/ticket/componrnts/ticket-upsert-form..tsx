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
    <Form action={action} actionState={actionState}>
      <Label htmlFor={titleId}>Title</Label>
      <Input id={titleId} name='title' type="text" defaultValue={
        (actionState.payload?.get('title') as string) ?? ticket?.title} />
      <FieldError actionState={actionState} fieldName='title' />

      <Label htmlFor={descriptionId}>Description</Label>
      <Textarea id={descriptionId} name='description' defaultValue={
        (actionState.payload?.get('description') as string) ?? ticket?.description} />
      <FieldError actionState={actionState} fieldName='description' />

      <SubmitButton label={ticket ? "Edit" : "Create"} isPending={isPending} />
    </Form>
  );
}

export { TicketUpsertForm };
