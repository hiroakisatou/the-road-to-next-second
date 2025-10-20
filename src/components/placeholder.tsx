import { faMessageQuestion } from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement;
  button?: React.ReactElement;
};

const Placeholder = ({ label, icon, button }: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {icon ? icon : <FontAwesomeIcon icon={faMessageQuestion} size="5x" />}
      <h2 className="text-lg text-center">{label}</h2>
      {button && <div className="h-10">{button}</div>}
    </div>
  );
};

export { Placeholder };
