import { format, isValid, parseISO } from "date-fns";

interface FormatDateProps {
  dateString: string | null | undefined;
  formatString?: string;
  position?: "left" | "center" | "right";
}

const getPositionClass = (position: "left" | "center" | "right" = "center") => {
  return position === "left"
    ? "text-left"
    : position === "right"
    ? "text-right"
    : "text-center";
};

export const FormatDate: React.FC<FormatDateProps> = ({
  dateString,
  formatString = "dd.MM.yyyy HH:mm",
  position = "left"
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
