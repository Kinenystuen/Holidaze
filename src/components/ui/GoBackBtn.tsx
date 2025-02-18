import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button/Button";

/**
 * A button component that navigates back to the previous page when clicked.
 *
 * @component
 * @returns {JSX.Element} A "Go Back" button with a left arrow icon.
 *
 * @example
 * // Example usage:
 * <GoBackBtn />
 */
const GoBackBtn = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      className="inline-flex items-center text-sm font-medium p-[0.3rem] pe-3 border-none hover:border-none dark:text-gray-400 dark:hover:text-white"
    >
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="w-3 h-3 me-2 m-0.5"
        aria-hidden="true"
      />
      Go back
    </Button>
  );
};

export default GoBackBtn;
