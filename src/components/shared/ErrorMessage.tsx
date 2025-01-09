import React from "react";
import P from "./Typography/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import H2 from "./Typography/H2";

interface ErrorMessageProps {
  message: string;
  children?: React.ReactNode;
  name?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  children,
  name
}) => {
  return (
    <section className="container w-full mb-10 flex justify-center items-center flex-col min-h-[60vh]">
      <div className="my-10 text-center">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-5xl m-3" />
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
