import type { ActionState } from "./action-state-type";

type FieldErrorProps = {
  actionState: ActionState;
  fieldName: string;
};

const FieldError = ({ actionState, fieldName }: FieldErrorProps) => {
  const message = actionState.fieldErrors?.[fieldName]?.[0];

  if (!message) return null;

  return <div className="text-red-500 text-sxs">{message}</div>;
};

export { FieldError };
