import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  label: string;
  isPending: boolean;
};

const SubmitButton = ({ label, isPending }: SubmitButtonProps) => {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending && <Spinner />}
      {label}
    </Button>
  );
};

export { SubmitButton };