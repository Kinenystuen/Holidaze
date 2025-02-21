import { H1Props } from "../../library/types";

/**
 * P Component
 * - Renders a paragraph element.
 * - @param {H1Props} props - The component props.
 * @component
 * @returns {JSX.Element} The P component.
 */

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
