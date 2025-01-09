import { H1Props } from "../../library/types";

function H3({ className, children }: H1Props) {
  return (
    <h3
      className={`font-body font-semibold text-customBgDark-900 dark:text-whiteFont-500 ${className}`}
    >
      {children}
    </h3>
  );
}
export default H3;
