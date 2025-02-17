import {
  FieldErrors,
  Path,
  UseFormRegister,
  FieldValues
} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface InputProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  InputId: Path<T>;
  InputLabel: string;
  icon?: IconDefinition;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  required?: boolean;
  pattern?: { value: RegExp; message: string };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  checked?: boolean;
  value?: string;
}
/**
 * Input Component
 *
 * A reusable input component with validation and optional icon support.
 * This component integrates with `react-hook-form` for managing form state
 * and validations, while also allowing a FontAwesome icon to be displayed
 * inside the input field.
 *
 * Features:
 * - Customizable label with floating behavior.
 * - Optional FontAwesome icon displayed inside the input field.
 * - Full support for `react-hook-form` validation rules:
 *   - `required`
 *   - `minLength`
 *   - `maxLength`
 *   - `pattern`
 * - Displays error messages based on form state.
 * - Dark mode support for seamless styling across themes.
 *
 * @template T - The type of form data managed by `react-hook-form`.
 *
 * @param {InputProps<T>} props - Props for the input component.
 * @param {FieldErrors<T>} props.errors - Errors object from `react-hook-form` for displaying validation messages.
 * @param {UseFormRegister<T>} props.register - `register` function from `react-hook-form` to bind input.
 * @param {Path<T>} props.InputId - A unique ID for the input field, corresponding to a key in the form data type.
 * @param {string} props.InputLabel - The label displayed for the input field.
 * @param {IconDefinition} [props.icon] - Optional FontAwesome icon to display inside the input field.
 * @param {number} [props.minLength] - Optional minimum length validation rule.
 * @param {number} [props.maxLength] - Optional maximum length validation rule.
 * @param {boolean} [props.required] - Optional flag to mark the input as required.
 * @param {{ value: RegExp; message: string }} [props.pattern] - Optional pattern validation rule with a custom message.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - Optional onChange event handler.
 *
 * @returns {JSX.Element} The rendered input component.
 *
 * @example
 * ```tsx
 * import { faUser } from "@fortawesome/free-solid-svg-icons";
 *
 * <Input
 *   InputId="username"
 *   InputLabel="Username"
 *   register={register}
 *   errors={errors}
 *   required
 *   minLength={3}
 *   icon={faUser}
 * />
 * ```
 */

const Input = <T extends FieldValues>({
  register,
  errors,
  InputId,
  InputLabel,
  icon,
  minLength,
  maxLength,
  min,
  max,
  required,
  pattern,
  onChange,
  type = "text",
  autoComplete = "on",
  checked,
  value
}: InputProps<T>): JSX.Element => {
  const errorMessage = (errors[InputId]?.message as string) || "";

  return (
    <div className="relative w-full">
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="absolute h-4 w-4 top-5 left-4 text-gray-400 peer-focus:text-color4-700 dark:text-gray-500 dark:peer-focus:text-color4-600"
        />
      )}

      <input
        id={InputId}
        {...register(InputId, {
          required: required ? `${InputLabel} is required.` : undefined,
          minLength: minLength
            ? {
                value: minLength,
                message: `Minimum length is ${minLength} characters.`
              }
            : undefined,
          maxLength: maxLength
            ? {
                value: maxLength,
                message: `Maximum length is ${maxLength} characters.`
              }
            : undefined,
          min: min
            ? { value: min, message: `Must be at least ${min}.` }
            : undefined,
          max: max
            ? { value: max, message: `Cannot exceed ${max}.` }
            : undefined,
          pattern: pattern
            ? { value: pattern.value, message: pattern.message }
            : undefined
        })}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full p-2 pl-12 pt-5 pb-2 text-black dark:text-whiteFont-500 bg-white dark:bg-customBgDark-500 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color4-700 focus:border-color4-600 ${
          icon ? "pl-10" : "pl-[1.8rem]"
        }`}
        type={type}
        autoComplete={autoComplete}
        checked={type === "checkbox" ? checked : undefined}
        aria-invalid={!!errorMessage}
        value={value}
      />

      <label
        htmlFor={InputId}
        className={`absolute rounded-md left-6 top-[-8px] text-gray-500 dark:text-whiteFont-700 bg-white text-sm dark:bg-customBgDark-500 px-1 transition-all 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
        peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-color4-800 dark:peer-focus:text-whiteFont-600 ${
          icon ? "peer-placeholder-shown:left-11 peer-focus:left-6" : ""
        }`}
      >
        {InputLabel}
      </label>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
