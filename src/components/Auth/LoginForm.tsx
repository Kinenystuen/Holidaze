import React from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../shared/Button/Button";
import { useAuth } from "../hooks/useAuth";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

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
      className="bg-white dark:bg-customBgDark-600 p-6 pt-2 rounded-b-xl rounded-e-xl w-full max-w-md mx-auto"
    >
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
            message:
              "Please enter a valid Noroff email (e.g., name@noroff.no or name@stud.noroff.no)."
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
