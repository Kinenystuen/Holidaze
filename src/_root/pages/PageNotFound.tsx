import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import ErrorMessage from "../../components/shared/ErrorMessage";
import Header from "../../components/shared/Header";

/**
 * PageNotFound Component
 * - Displays a 404 error message.
 * - @component
 * @returns {JSX.Element} The PageNotFound component.
 */

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-start w-screen items-center h-screen">
      <Header />

      <ErrorMessage message="404 Page not found">
        <Button
          onClick={handleGoBack}
          buttonType="violet"
          className="my-3 px-8"
        >
          Go back
        </Button>
      </ErrorMessage>
    </div>
  );
};

export default PageNotFound;
