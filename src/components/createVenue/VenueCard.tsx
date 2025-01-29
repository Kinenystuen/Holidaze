import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import H2 from "../shared/Typography/H2";
import {
  faCar,
  faEdit,
  faMapMarkerAlt,
  faPaw,
  faStar,
  faTrash,
  faUserFriends,
  faUtensils,
  faWifi
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
    // <div className=" flex flex-col lg:flex-row gap-3 bg-white dark:bg-customBgDark-500 shadow-md rounded-lg h-fit">
    <>
      {/* Show Loader if deleting */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-40">
          <LoaderSmall />
        </div>
      ) : (
        <div
          key={venue.id}
          className="sm:flex bg-white dark:bg-customBgDark-500 shadow-sm rounded-lg h-60 group transition-transform transform scale-95 hover:scale-100 fade-in-up"
        >
          <div>
            <img
              src={venue.media[0]?.url}
              alt={venue.media[0]?.alt}
              className="w-full h-72 lg:w-80 lg:h-full object-cover rounded-s-lg"
            />
          </div>
          <div className="p-4 w-full h-full flex flex-col justify-between">
            <div>
              {/* Venue Name and Rating */}
              <div className="flex justify-between items-center">
                <H2 className="text-sm md:text-base font-semibold truncate">
                  {venue.name}
                </H2>
                <div className="ml-2 text-sm text-gray-700 dark:text-whiteFont-500 whitespace-nowrap flex items-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    size="sm"
                    className="mr-2 my-0"
                  />
                  {venue.rating}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-sm text-gray-600 mt-[-4px]">
                {(venue.location.city || venue.location.country) && (
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="mr-2 text-gray-500 w-3 h-3 px-1"
                    />
                    <P className="text-gray-600 text-[10px]">
                      {[venue.location.city, venue.location.country]
                        .filter(Boolean)
                        .join(", ")}
                    </P>
                  </div>
                )}
              </div>

              {/* Icons */}
              <ul className="flex flex-wrap gap-4 mt-2 mb-3">
                {venue.meta.wifi && (
                  <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                    <FontAwesomeIcon
                      icon={faWifi}
                      size="xs"
                      className="w-4 h-4 p-1"
                    />
                    <P className="text-xs">Wifi</P>
                  </li>
                )}
                {venue.meta.parking && (
                  <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                    <FontAwesomeIcon
                      icon={faCar}
                      size="xs"
                      className="w-4 h-4 p-1"
                    />
                    <P className="text-xs">Parking</P>
                  </li>
                )}
                {venue.meta.breakfast && (
                  <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                    <FontAwesomeIcon
                      icon={faUtensils}
                      size="xs"
                      className="w-4 h-4 p-1"
                    />
                    <P className="text-xs">Breakfast</P>
                  </li>
                )}
                {venue.meta.pets && (
                  <li className="flex flex-col items-center text-gray-800 dark:text-whiteFont-700">
                    <FontAwesomeIcon
                      icon={faPaw}
                      size="xs"
                      className="w-4 h-4 p-1"
                    />
                    <P className="text-xs">Pets</P>
                  </li>
                )}
              </ul>
            </div>
            {/* Max Guests and Price at the Bottom */}
            <div className="md:mt-auto flex justify-between">
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <FontAwesomeIcon
                  icon={faUserFriends}
                  className="mr-2 w-4 h-4 p-1 text-gray-500"
                />
                <P className="text-sm">Max Guests: {venue.maxGuests}</P>
              </div>
              <div className="flex justify-end text-lg">
                <P className="text-black dark:text-whiteFont-200">
                  {venue.price} kr{" "}
                  <span className="text-sm text-gray-800 dark:text-whiteFont-700">
                    / night
                  </span>
                </P>
              </div>
            </div>
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

          {/* <div>
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
          </div> */}
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default VenueCard;
