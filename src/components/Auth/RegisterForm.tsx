import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../shared/Button/Button";
import { useAuth } from "../hooks/useAuth";
import H2 from "../shared/Typography/H2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faTimes,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../ui/ToolTip";
import P from "../shared/Typography/P";

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
  const [showPassword, setShowPassword] = useState(false);
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
      // 1. Register the User
      await submitAuth(data, "/auth/register");

      // 2. Then, Automatically Log In
      await submitAuth(
        { email: data.email, password: data.password },
        "/auth/login"
      );
    } catch (error) {
      console.error("Registration failed:", error);
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
      <H2 className="mt-4 mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
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
            value: /^[A-Z][A-Za-z0-9_-]{2,29}$/,
            message:
              "Username must start with an uppercase letter and can only contain letters, numbers, underscores, and hyphens (no letter spacing)."
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
      <div className="relative mb-4">
        <Input
          InputId="password"
          InputLabel="Password"
          register={register}
          errors={errors}
          required
          minLength={8}
          pattern={{
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
            message:
              "Password must be 8-64 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character."
          }}
          icon={faLock}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
        />
        {/* Eye Icon Button */}
        <Button
          type="button"
          buttonType="transparent"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-1 hover:text-black"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <FontAwesomeIcon
            className=" text-gray-400 dark:text-gray-400"
            icon={showPassword ? faEyeSlash : faEye}
          />
        </Button>
      </div>

      {/* Error Message */}
      {authError && (
        <P className="text-red-500 text-sm mb-4">
          Registration failed{authError}
        </P>
      )}

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
