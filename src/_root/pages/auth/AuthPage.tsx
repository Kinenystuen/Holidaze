import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoginForm from "../../../components/Auth/LoginForm";
import RegisterForm from "../../../components/Auth/RegisterForm";
import Button from "../../../components/shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";

const AuthPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "login"; // Default to "login"

  const handleTypeChange = (newType: string) => {
    setSearchParams({ type: newType });
  };

  return (
    <div className="auth-container h-screen w-screen bg-slate-800 dark:bg-gray-900 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Plane in the sky"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-40 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-md mx-auto h-[90vh] flex flex-col justify-center items-center ">
        {/* Tab Buttons */}
        <div className="tab-buttons flex justify-center items-center w-full ">
          <Button
            onClick={() => handleTypeChange("login")}
            ariaLabel="Login Tab"
            className={`p-2 w-full font-semibold transition-all text-2xl ${
              type === "login"
                ? "bg-gradient-to-t from-white to-whiteFont-500 dark:from-customBgDark-600 dark:to-customBgDark-500 border-white dark:border-customBgDark-600 dark:hover:border-customBgDark-600 text-black dark:text-white z-10 cursor-default"
                : "bg-transparent hover:rounded-s-xl text-whiteFont-500 hover:bg-purple-500 hover:text-white dark:bg-transparent dark:text-whiteFont-500 dark:hover:bg-color3-500"
            } rounded-none rounded-t-xl`}
          >
            Login
          </Button>
          <Button
            buttonType="violet"
            ariaLabel="Register Tab"
            onClick={() => handleTypeChange("register")}
            className={`p-2 w-full font-semibold transition-all text-2xl ${
              type === "register"
                ? "bg-gradient-to-t from-white to-whiteFont-500 dark:from-customBgDark-600 dark:to-customBgDark-500 border-white dark:border-customBgDark-600 dark:hover:border-customBgDark-600 text-black dark:text-white z-10  cursor-default"
                : "bg-transparent hover:rounded-e-xl text-whiteFont-500 hover:bg-purple-500 hover:text-white dark:bg-transparent dark:text-whiteFont-500 dark:hover:bg-color3-500"
            } rounded-none rounded-t-xl `}
          >
            Register
          </Button>
        </div>

        {/* Forms */}
        {type === "login" ? <LoginForm /> : <RegisterForm />}

        {/* Home Link */}
        <Link
          to="/"
          className="mt-6 mx-auto text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-white transition flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
