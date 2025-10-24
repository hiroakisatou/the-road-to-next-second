import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

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
