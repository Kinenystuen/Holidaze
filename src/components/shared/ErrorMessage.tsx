import React from "react";
import P from "./Typography/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import H2 from "./Typography/H2";

interface ErrorMessageProps {
  message?: string;
  children?: React.ReactNode;
  name?: string;
  className?: string;
  fontAwesomeIcon?: React.ReactNode;
  icon?: boolean;
}

/**
 * ErrorMessage Component
 *
 * This component displays an error message with an optional icon and a custom message.
 *
 * @component
 * @example
 * // Usage:
 * <ErrorMessage message="Failed to load data" />
 *
 * @returns {JSX.Element} The rendered ErrorMessage component.
 */

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  children,
  name,
  className = "",
  fontAwesomeIcon,
  icon = true
}) => {
  return (
    <section
      role="alert"
      aria-label={`Error: ${name || "Data Fetching"}`}
      className={`container w-full mb-10 flex justify-center items-center flex-col min-h-[60vh] ${className}`}
    >
      <div className="text-center">
        {icon && (
          <div>
            {fontAwesomeIcon ? (
              fontAwesomeIcon
            ) : (
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-color2-900 dark:text-color1-200 text-5xl p-4"
              />
            )}
          </div>
        )}
        {name && (
          <H2 className="uppercase font-bold">Error fetching {name} data</H2>
        )}
        <P className="uppercase font-bold">{message}</P>
      </div>

      {children}
    </section>
  );
};

export default ErrorMessage;
