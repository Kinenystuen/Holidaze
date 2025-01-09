import { H1Props } from "../../library/types";

function H1({ className, children, style }: H1Props) {
  return (
    <h1
      className={`font-body text-3xl font-bold text-black dark:text-whiteFont ${className}`}
      style={style}
    >
      {children}
    </h1>
  );
}
export default H1;
