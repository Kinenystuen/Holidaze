import { format, isValid, parseISO } from "date-fns";

/**
 * Props for the FormatDate component.
 * @typedef {Object} FormatDateProps
 * @property {string | null | undefined} dateString - The date string to format.
 * @property {string} [formatString="dd.MM.yyyy HH:mm"] - The format in which the date should be displayed.
 * @property {"left" | "center" | "right"} [position="left"] - Text alignment: left, center, or right.
 */
interface FormatDateProps {
  dateString: string | null | undefined;
  formatString?: string;
  position?: "left" | "center" | "right";
}

/**
 * Returns the appropriate Tailwind CSS class for text alignment.
 * @param {"left" | "center" | "right"} [position="center"] - The position for text alignment.
 * @returns {string} - A Tailwind CSS class for alignment.
 */
const getPositionClass = (
  position: "left" | "center" | "right" = "center"
): string => {
  return position === "left"
    ? "text-left"
    : position === "right"
    ? "text-right"
    : "text-center";
};

/**
 * A React component that formats and displays a given date string.
 * If the provided date is invalid, it displays "Invalid date" in red.
 *
 * @component
 * @param {FormatDateProps} props - The props for the FormatDate component.
 * @returns {JSX.Element} - A formatted date or an "Invalid date" message.
 *
 * @example
 * // Example usage:
 * <FormatDate dateString="2025-02-18T12:30:00Z" />
 *
 * <FormatDate dateString="2025-02-18T12:30:00Z" position="center" />
 *
 * <FormatDate dateString="2025-02-18T12:30:00Z" formatString="yyyy/MM/dd" />
 */
export const FormatDate: React.FC<FormatDateProps> = ({
  dateString,
  formatString = "dd.MM.yyyy HH:mm",
  position = "center"
}) => {
  if (!dateString) {
    return <span className="text-red-500">Invalid date</span>;
  }

  const date = parseISO(dateString.trim());

  if (!isValid(date)) {
    return <span className="text-red-500">Invalid date</span>;
  }

  return (
    <span className={`inline-block ${getPositionClass(position)}`}>
      {format(date, formatString)}
    </span>
  );
};
