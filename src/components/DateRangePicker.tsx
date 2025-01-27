import { useRef, useState, useEffect } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DatePickerModal from "./Booking/DatePickerModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import P from "./shared/Typography/P";
import H3 from "./shared/Typography/H3";
import Button from "./shared/Button/Button";

interface DateRangePickerProps {
  dateRange: { startDate: Date; endDate: Date; key: string }[];
  onDateChange: (rangesByKey: RangeKeyDict) => void;
  isCalendarOpen: boolean;
  toggleCalendar: () => void;
  isDateDisabled: (date: Date) => boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateChange,
  isCalendarOpen,
  toggleCalendar,
  isDateDisabled
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect screen size

  // Listen for screen resize and update layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Date Display */}
      <div
        className="flex items-center justify-between w-full border border-color1-200 dark:border-customBgDark-400 border-b-0 p-2 md:p-3 md:gap-6 rounded-t-md bg-gray-100 dark:bg-customBgDark-500 cursor-pointer hover:border-color1-500 transition"
        onClick={toggleCalendar}
      >
        <div className="flex items-center gap-2">
          <div>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              <small>CHECK-IN</small>
            </span>
            <P className="text-lg font-semibold">
              {format(dateRange[0].startDate, "dd.MM.yyyy")}
            </P>
          </div>
        </div>

        <FontAwesomeIcon
          icon={faArrowRight}
          className="mx-2 text-gray-500 dark:text-gray-300"
        />

        <div className="flex items-center gap-2">
          <div>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              <small>CHECK-OUT</small>
            </span>
            <p className="text-lg font-semibold">
              {format(dateRange[0].endDate, "dd.MM.yyyy")}
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Date Picker */}
      {isCalendarOpen && (
        <DatePickerModal isOpen={isCalendarOpen} onClose={toggleCalendar}>
          <div
            ref={modalRef}
            className="dark:bg-customBgDark-500 w-full max-w-3xl md:max-w-2xl mx-auto p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <H3 className="text-lg font-semibold mb-4 text-center">
              Select Your Dates
            </H3>

            {/* Responsive Date Picker */}
            <DateRange
              editableDateInputs
              onChange={onDateChange}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              months={isMobile ? 1 : 2} // 🔹 1 month on mobile, 2 months on desktop
              direction={isMobile ? "vertical" : "horizontal"} // 🔹 Vertical for mobile, horizontal for desktop
              showMonthAndYearPickers
              minDate={new Date()}
              disabledDay={isDateDisabled}
              className="border rounded-lg shadow-md w-full bg-white text-gray-900 border-gray-300 dark:bg-customBgDark-500 dark:text-gray-200 dark:border-customBgDark-600"
            />

            {/* Buttons */}
            <div className="mt-4 flex flex-col md:flex-row justify-between gap-2">
              <Button
                buttonType="violetSecondary"
                onClick={toggleCalendar}
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
              <Button
                buttonType="violet"
                onClick={toggleCalendar}
                className="w-full md:w-auto"
              >
                Confirm Dates
              </Button>
            </div>
          </div>
        </DatePickerModal>
      )}
    </>
  );
};

export default DateRangePicker;
