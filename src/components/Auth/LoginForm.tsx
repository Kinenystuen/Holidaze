import React from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../shared/Button/Button";
import { useAuth } from "../hooks/useAuth";
import { faEnvelope, faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import H2 from "../shared/Typography/H2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../ui/ToolTip";

interface LoginFormData {
  email: string;
  password: string;
}

/**
 * LoginForm Component
 *
 * This component provides a login form for users. It includes input fields
 * for the user's email, and password, and performs validation using `react-hook-form`.
 * The form interacts with the `useAuth` hook to send the user data to the API for account login.
 *
 * Features:
 * - Input validation:
 *   - Email: Must match Noroff email format (e.g., `name@noroff.no` or `name@stud.noroff.no`)
 *   - Password: Required
 * - Error handling: Displays field-specific errors and API errors
 * - Button states: Disables the submit button while processing or submitting
 *
 * Dependencies:
 * - `react-hook-form`: For form state management and validation
 * - `useAuth`: Custom hook for handling authentication API calls
 * - `Input`: Reusable input field component
 * - `Button`: Reusable button component
 * - `H2`: Reusable heading component
 *
 * @component
 * @example
 * // Usage:
 * <RegisterForm />
 *
 * @returns {JSX.Element} The rendered registration form component.
 */
const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();
  const { submitAuth, isLoading, error: authError } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await submitAuth(data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white dark:bg-customBgDark-600 px-8 pt-2 rounded-t-xl w-full max-w-md mx-auto"
    >
      {/* Back Button */}
      <Link
        to="/"
        onClick={() => window.history.back()}
        className="absolute top-4 right-4 text-whiteFont-600 dark:text-whiteFont-600"
      >
        <Tooltip text="Go back" position="bottom">
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
        </Tooltip>
      </Link>
      <H2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
        Login
      </H2>

      {/* Email Input */}
      <div className="mb-4">
        <Input
          InputId="email"
          InputLabel="Email"
          register={register}
          errors={errors}
          required
          pattern={{
            value: /^[\w\-.]+@(stud\.)?noroff\.no$/,
            message: "Please enter a valid Noroff email"
          }}
          icon={faEnvelope}
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <Input
          InputId="password"
          InputLabel="Password"
          register={register}
          errors={errors}
          required
          icon={faLock}
        />
      </div>

      {/* Error Message */}
      {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}

      {/* Submit Button */}
      <Button
        type="submit"
        buttonType="violet"
        disabled={isSubmitting || isLoading}
        className="w-full text-white py-2 rounded-md disabled:bg-gray-400"
      >
        {isSubmitting || isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
