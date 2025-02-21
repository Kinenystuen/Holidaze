import { H1Props } from "../../library/types";

/**
 * H1 Component
 * - Renders an H1 heading element.
 * - @param {H1Props} props - The component props.
 * @component
 * @returns {JSX.Element} The H1 component.
 */

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
