import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import H2 from "../shared/Typography/H2";
import {
  faCar,
  faEdit,
  faPaw,
  faStar,
  faTrash,
  faUsers,
  faUtensils,
  faWifi,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import P from "../shared/Typography/P";
import { useDeleteVenue } from "../hooks/UseDeleteVenue";
import Button from "../shared/Button/Button";
import ButtonDropdown from "../ButtonDropdown";
import { Venue } from "../library/types";
import LoaderSmall from "../ui/LoaderSmall";
import { Link } from "react-router-dom";

const VenueCard = ({
  venue,
  refetchVenue
}: {
  venue: Venue;
  refetchVenue: () => void;
}) => {
  const { deleteVenue, isLoading } = useDeleteVenue(venue.id);

  /** Small Feature Box */
  const Feature = ({ icon, text }: { icon: IconDefinition; text: string }) => (
    <div className="flex items-center gap-2 py-1 ">
      <FontAwesomeIcon icon={icon} className="text-color1-200 w-5 h-5" />
      <P>{text}</P>
    </div>
  );

  const handleEditVenue = () => {
    console.log("Edit booking clicked");
  };

  const handleDeleteVenue = async () => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      console.log("Delete venue");
      await deleteVenue();
      refetchVenue();
    }
  };

  return (
    <div className=" flex flex-col lg:flex-row gap-3 p-4 bg-white dark:bg-customBgDark-500 shadow-md rounded-lg h-fit">
      {/* Show Loader if deleting */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-40">
          <LoaderSmall />
        </div>
      ) : (
        <>
          <div>
            <img
              src={venue.media[0]?.url}
              alt={venue.media[0]?.alt}
              className="w-full h-72 lg:w-80 lg:h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-full h-full p-1">
            <div className="flex justify-between items-center">
              <H2 className="md:text-2xl font-semibold truncate">
                {venue.name}
              </H2>
              <div className="text-sm text-customBgDark-900 dark:text-whiteFont-500">
                <FontAwesomeIcon
                  icon={faStar}
                  size="sm"
                  className="mr-2 my-0"
                />
                {venue.rating}
              </div>
            </div>
            <P className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              {venue.description}
            </P>
            <div className="items-start justify-between">
              <Feature icon={faUsers} text={`Max Guests: ${venue.maxGuests}`} />
            </div>
            <div className=" flex gap-6 text-gray-700">
              {venue?.meta.wifi && <Feature icon={faWifi} text="Wi-Fi" />}
              {venue?.meta.parking && <Feature icon={faCar} text="Parking" />}
              {venue?.meta.breakfast && (
                <Feature icon={faUtensils} text="Breakfast" />
              )}
              {venue?.meta.pets && <Feature icon={faPaw} text="Pets Allowed" />}
            </div>
            <P className="text-md mt-2">{venue.price} kr / night</P>
            <div className="flex gap-2 justify-center lg:justify-end mt-2">
              <ButtonDropdown
                label="Edit Venue"
                options={[
                  {
                    label: "Edit Venue",
                    action: handleEditVenue,
                    icon: faEdit
                  },
                  {
                    label: "Delete Venue",
                    action: handleDeleteVenue,
                    icon: faTrash,
                    danger: true
                  }
                ]}
              />
              <Link to={`/venue/${venue.id}`}>
                <Button buttonType="violet" className="">
                  View Venue
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VenueCard;
