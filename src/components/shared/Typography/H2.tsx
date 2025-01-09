import { H1Props } from "../../library/types";

function H2({ className, children }: H1Props) {
  return (
    <h2
      className={`font-body text-2xl md:text-3xl font-semibold text-black dark:text-whiteFont ${className}`}
    >
      {children}
    </h2>
  );
}
export default H2;
