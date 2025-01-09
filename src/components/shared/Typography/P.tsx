import { H1Props } from "../../library/types";

function P({ className, children }: H1Props) {
  return (
    <p
      className={`font-body  text-black  dark:text-whiteFont-600 ${className}`}
    >
      {children}
    </p>
  );
}
export default P;
