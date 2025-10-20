import { faMessage } from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PlaceholderProps = {
    label: string;
    button?: React.ReactElement;
};

const Placeholder = ({ label, button }: PlaceholderProps) => {
    return (
      <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
       <FontAwesomeIcon icon={faMessage} />
       <h2 className="text-lg text-center">{label}</h2>
        {button && <div className="h-10">{button}</div>}
      </div>
    );
};

export { Placeholder };
