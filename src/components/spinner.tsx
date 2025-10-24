import { Spinner as BaseSpinner } from "@/components/ui/spinner";

const Spinner = () => {
  return (
    <div
      role="img"
      alea-lable="Loading..."
      className="flex-1 flex flex-col items-center justify-center self-center"
    >
      <BaseSpinner className="size-16" />
    </div>
  );
};

export { Spinner };
