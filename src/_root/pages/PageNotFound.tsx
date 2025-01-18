import Button from "../../components/shared/Button/Button";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <ErrorMessage message="404 Page not found">
        <Link to="/" className="m-1.5 p-2 hover:bg-transparent rounded-lg px-4">
          <Button buttonType="violet">Go back to homepage</Button>
        </Link>
      </ErrorMessage>
    </div>
  );
};

export default PageNotFound;
