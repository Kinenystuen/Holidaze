import React from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../shared/Button/Button";
import { useAuth } from "../hooks/useAuth";
import H2 from "../shared/Typography/H2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faTimes,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../ui/ToolTip";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

/**
 * RegisterForm Component
 *
 * This component provides a registration form for new users. It includes input fields
 * for the user's name, email, and password, and performs validation using `react-hook-form`.
 * The form interacts with the `useAuth` hook to send the user data to the API for account creation.
 *
 * Features:
 * - Input validation:
 *   - Username: Alphanumeric, 3-30 characters
 *   - Email: Must match Noroff email format (e.g., `name@noroff.no` or `name@stud.noroff.no`)
 *   - Password: Minimum of 8 characters
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
const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>();

  // Initialize useAuth with default values for registration
  const {
    submitAuth,
    isLoading,
    error: authError
  } = useAuth("/auth/register", "/venues");

  // Handle form submission
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await submitAuth(data);
    } catch (err) {
      console.error("Registration failed:", err);
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

      {/* Register Heading */}
      <H2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
        Register
      </H2>
      {/* Username Input */}
      <div className="mb-4">
        <Input
          InputId="name"
          InputLabel="Username"
          icon={faUser}
          register={register}
          errors={errors}
          required
          minLength={3}
          maxLength={30}
          pattern={{
            value: /^[\w]+$/,
            message:
              "Please provide a valid username. It can only contain letters, numbers, and underscores."
          }}
        />
      </div>
      {/* Email Input */}
      <div className="mb-4">
        <Input
          InputId="email"
          InputLabel="Email"
          icon={faEnvelope}
          register={register}
          errors={errors}
          required
          pattern={{
            value: /^[\w\-.]+@stud\.noroff\.no$/,
            message: "Please enter a valid Noroff email (name@stud.noroff.no)."
          }}
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <Input
          InputId="password"
          InputLabel="Password"
          icon={faLock}
          register={register}
          errors={errors}
          required
          minLength={8}
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
        {isSubmitting || isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
