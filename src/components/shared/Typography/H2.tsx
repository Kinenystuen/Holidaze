import { H1Props } from "../../library/types";

/**
 * H2 Component
 * - Renders an H2 heading element.
 * - @param {H1Props} props - The component props.
 * @component
 * @returns {JSX.Element} The H2 component.
 */

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
