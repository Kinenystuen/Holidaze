import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoginForm from "../../../components/Auth/LoginForm";
import RegisterForm from "../../../components/Auth/RegisterForm";

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "login";

  return (
    <div className="auth-container h-screen w-screen bg-slate-800 dark:bg-gray-900 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Plane in the sky"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-50 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-md mx-auto h-[90vh] flex flex-col justify-center items-center ">
        {/* Forms */}
        {type === "login" ? <LoginForm /> : <RegisterForm />}

        {/* Register user link */}
        <div className="bg-white dark:bg-customBgDark-600 rounded-b-xl w-full px-8 pt-1 pb-8  mx-auto text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white transition flex items-center justify-start">
          {type === "login" ? (
            <Link
              to="/auth?type=register"
              className="text-gray-500 group dark:text-whiteFont-600 transition mt-2"
            >
              New around here?{" "}
              <span className="text-black dark:text-white  group-hover:text-purple-600 group-dark:hover:text-color3-500 transition">
                Register here.
              </span>
            </Link>
          ) : (
            <Link
              to="/auth?type=login"
              className="text-gray-500 group dark:text-whiteFont-600 transition mt-2"
            >
              Already an user?{" "}
              <span className="text-black dark:text-white  group-hover:text-purple-600 group-dark:hover:text-color3-500 transition">
                Login here.
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
