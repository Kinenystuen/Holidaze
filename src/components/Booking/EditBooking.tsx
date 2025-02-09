import { useEffect, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { apiHostUrl } from "../library/constants";
import Modal from "../ui/Modal";
import GuestsSelector from "../GuestsSelector";
import Button from "../shared/Button/Button";
import { useApi } from "../hooks/UseApi";
import LoaderSmall from "../ui/LoaderSmall";
import P from "../shared/Typography/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock, faUsers } from "@fortawesome/free-solid-svg-icons";
import H2 from "../shared/Typography/H2";
import { FormatDate } from "../ui/FormatDate";
import BookingDatePicker from "./BookingDatePicker";

interface EditBookingProps {
  booking: {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
  };
  maxGuests: number;
  onClose: () => void;
  onUpdate: () => void;
  venueId: string;
}

const EditBooking: React.FC<EditBookingProps> = ({
  booking,
  maxGuests,
  onClose,
  onUpdate,
  venueId
}) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(booking.dateFrom),
      endDate: new Date(booking.dateTo),
      key: "selection"
    }
  ]);
  const [guests, setGuests] = useState<number>(booking.guests);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [updatedBookingData, setUpdatedBookingData] = useState<{
    dateFrom: string;
    dateTo: string;
    guests: number;
  } | null>(null);

  // Handles date changes
  const handleDateChange = (rangesByKey: RangeKeyDict) => {
    setDateRange([
      {
        startDate: rangesByKey.selection.startDate || new Date(),
        endDate: rangesByKey.selection.endDate || new Date(),
        key: rangesByKey.selection.key || "selection"
      }
    ]);
  };

  // Function to update booking using useApi
  const { response, fetchData } = useApi(
    `${apiHostUrl}/holidaze/bookings/${booking.id}`,
    {
      method: "PUT"
    },
    false
  );

  // Handles booking update request
  const handleUpdateBooking = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    const updatedBooking = {
      dateFrom: dateRange[0].startDate.toISOString(),
      dateTo: dateRange[0].endDate.toISOString(),
      guests
    };

    try {
      await fetchData({
        body: updatedBooking
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (response) {
      setUpdatedBookingData(response.data as EditBookingProps["booking"]);
      setSuccessMessage("Booking updated successfully!");
    }
  }, [response]);

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    onUpdate();
    onClose();
  };

  return (
    <>
      {/* Edit Booking Modal */}
      <Modal isOpen={true} onClose={onClose} className="max-w-md">
        <H2>Edit Booking</H2>
        <div className="p-4 space-y-4">
          {/* Date Picker */}
          <div>
            <P>Select Dates</P>
            <BookingDatePicker
              venueId={venueId}
              bookingId={booking.id}
              selectedRange={dateRange}
              onDateChange={handleDateChange}
            />
          </div>

          {/* Guests Selector */}
          <div>
            <P>Number of Guests</P>
            <GuestsSelector
              guests={guests}
              maxGuests={maxGuests}
              onChange={setGuests}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button
              buttonType="violetSecondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              buttonType="violet"
              onClick={handleUpdateBooking}
              disabled={isSaving}
            >
              {isSaving ? <LoaderSmall /> : "Save Changes"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Message Modal */}
      {successMessage && (
        <Modal isOpen={true} onClose={handleSuccessClose}>
          <div className="flex flex-col items-center gap-2 my-10 mb-14">
            <div className="w-16 h-16 bg-color1-100 dark:bg-color1-600 p-4 m-2 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="w-8 h-8 text-color1-500 dark:text-color1-200"
              />
            </div>
            <H2 className="md:text-4xl font-heading font-semibold text-color1-600 dark:text-color1-200">
              {successMessage}
            </H2>
            <P className="mt-2 max-w-md text-center">
              Booking {booking.id}, has been successfully updated.
            </P>

            <div className="flex flex-col gap-2 p-4 px-6 m-2 rounded-md border border-zinc-700">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="w-4 h-4 text-2xl p-1"
                />
                <P className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  Guests: {updatedBookingData?.guests}
                </P>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faClock}
                  className="w-4 h-4 text-2xl p-1"
                />
                <div>
                  <P className="text-sm text-gray-600 dark:text-gray-300">
                    Check-in:{" "}
                    <FormatDate
                      dateString={updatedBookingData?.dateFrom}
                      formatString="dd.MM.yyyy"
                    />
                  </P>
                  <P className="text-sm text-gray-600 dark:text-gray-300">
                    Check-out:{" "}
                    <FormatDate
                      dateString={updatedBookingData?.dateTo}
                      formatString="dd.MM.yyyy"
                    />
                  </P>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditBooking;
