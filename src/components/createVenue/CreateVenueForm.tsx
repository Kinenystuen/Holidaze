import { useForm } from "react-hook-form";
import { useVenue } from "../hooks/UseVenue";
import useCreateVenue from "../hooks/useCreateVenue";
import Input from "../ui/Input";
import ImageUploader from "./ImageUploader";
import Button from "../shared/Button/Button";
import { ErrorMessage } from "@hookform/error-message";
import {
  faCar,
  faCheck,
  faCity,
  faCompass,
  faEnvelope,
  faGlobeEurope,
  faHouse,
  faInfo,
  faLocationArrow,
  faMap,
  faMoneyCheckDollar,
  faPaw,
  faStar,
  faUsers,
  faUtensils,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MetaCheckbox from "../ui/MetaCheckbox";
import LoaderSmall from "../ui/LoaderSmall";
import { useState } from "react";
import VenuePreview from "./VenuePreview";
import H3 from "../shared/Typography/H3";
import Modal from "../ui/Modal";
import H2 from "../shared/Typography/H2";
import P from "../shared/Typography/P";
import { Link } from "react-router-dom";

const VenueForm = () => {
  const { venue, setVenue, updateVenue } = useVenue();
  const [togglePreview, setTogglePreview] = useState(false);
  const {
    createVenue,
    loading,
    successMessage,
    setSuccessMessage,
    errorMessage,
    venueId
  } = useCreateVenue();

  const handlePreview = () => {
    setTogglePreview(!togglePreview);
    console.log(togglePreview);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors
  } = useForm({
    mode: "onBlur"
  });

  const submitHandler = () => {
    createVenue(venue, () => {
      reset();
      setVenue({
        name: "",
        description: "",
        media: [],
        price: 0,
        maxGuests: 1,
        rating: 0,
        meta: { wifi: false, parking: false, breakfast: false, pets: false },
        location: {
          address: "",
          city: "",
          zip: "",
          country: "",
          continent: "",
          lat: 0,
          lng: 0
        }
      });
    });
  };

  const metaIcons = {
    wifi: faWifi,
    parking: faCar,
    breakfast: faUtensils,
    pets: faPaw
  };

  const metaKeys: (keyof typeof venue.meta)[] = [
    "wifi",
    "parking",
    "breakfast",
    "pets"
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-600";
    if (rating >= 3) return "bg-yellow-500";
    if (rating >= 1.5) return "bg-orange-500";
    if (rating > 0) return "bg-gray-500";
    return "bg-gray-400";
  };

  const locationFields = [
    { id: "address", label: "Address", icon: faHouse, type: "text" },
    { id: "city", label: "City", icon: faCity, type: "text" },
    { id: "zip", label: "Zip Code", icon: faEnvelope, type: "text" },
    { id: "country", label: "Country", icon: faGlobeEurope, type: "text" },
    { id: "continent", label: "Continent", icon: faMap, type: "text" },
    { id: "lat", label: "Latitude", icon: faLocationArrow, type: "number" },
    { id: "lng", label: "Longitude", icon: faCompass, type: "number" }
  ];

  return (
    <>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(submitHandler)}
      >
        <H3 className="mt-3">Venue details</H3>
        {/* Venue Name */}
        <Input
          InputId="name"
          InputLabel="Venue Name"
          icon={faHouse}
          register={register}
          errors={errors}
          required
          minLength={3}
          onChange={(e) => {
            updateVenue({ name: e.target.value });
            clearErrors("name");
          }}
        />

        {/* Description */}
        <div className="relative w-full">
          <FontAwesomeIcon
            icon={faInfo}
            className="absolute h-4 w-4 top-5 left-4 text-gray-400"
          />
          <textarea
            {...register("description", {
              required: "Description is required.",
              minLength: {
                value: 3,
                message: "Minimum length is 3 characters."
              },
              maxLength: {
                value: 1000,
                message: "Maximum length is 1000 characters."
              }
            })}
            placeholder=""
            className="peer w-full p-2 pl-10 pt-5 pb-2 border dark:bg-customBgDark-500 border-gray-300 dark:border-customBgDark-500 rounded-md"
            onChange={(e) => {
              updateVenue({ description: e.target.value });
              clearErrors("description");
            }}
          />
          {/* Input Label */}
          <label
            htmlFor={"Description"}
            className={`absolute rounded-md left-6 top-[-8px] text-gray-500 dark:text-whiteFont-700 bg-white text-sm dark:bg-customBgDark-500 px-1 transition-all 
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
          peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-color4-800 dark:peer-focus:text-whiteFont-600
            peer-placeholder-shown:left-11 peer-focus:left-6
          }`}
          >
            Description
          </label>
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ message }) => (
              <p className="text-red-500 text-sm mt-1">{message}</p>
            )}
          />
        </div>

        <div className="flex flex-row w-full gap-3 mt-0">
          {/* Price */}
          <Input
            InputId="price"
            InputLabel="Price"
            icon={faMoneyCheckDollar}
            register={register}
            errors={errors}
            required
            pattern={{ value: /^[0-9]+$/, message: "Only numbers allowed." }}
            onChange={(e) => {
              updateVenue({ price: Number(e.target.value) });
              clearErrors("price");
            }}
          />

          {/* Max Guests */}
          <Input
            InputId="maxGuests"
            InputLabel="Max Guests"
            icon={faUsers}
            register={register}
            errors={errors}
            required
            min={1}
            max={100}
            pattern={{ value: /^[0-9]+$/, message: "Only numbers allowed." }}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > 100) return;
              updateVenue({ maxGuests: value });
              clearErrors("maxGuests");
            }}
          />
        </div>

        {/* Meta checkboxes */}
        <H3 className="mt-3">Facilities</H3>
        <div className="grid grid-cols-2 gap-3">
          {metaKeys.map((key) => (
            <MetaCheckbox
              key={key}
              id={key}
              label={key}
              icon={metaIcons[key]}
              checked={venue.meta[key]}
              onChange={(checked) =>
                updateVenue({ meta: { ...venue.meta, [key]: checked } })
              }
            />
          ))}
        </div>
        <H3 className="mt-3">Rating</H3>
        {/* Rating */}
        <label className="flex flex-col gap-2 w-full max-w-72 p-3 rounded-md border border-gray-300 dark:border-customBgDark-500 bg-white dark:bg-customBgDark-500 text-black dark:text-whiteFont-500 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faStar}
              className=" h-4 w-4 transform text-gray-400 peer-focus:text-color4-700 dark:text-gray-500 dark:peer-focus:text-color4-600"
            />
            <span className="text-sm text-gray-400 font-medium">Rating:</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Styled Range Slider */}
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={venue.rating}
              onChange={(e) => updateVenue({ rating: Number(e.target.value) })}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 
                 focus:outline-none focus:ring-2 focus:ring-color4-700 focus:border-color4-600"
            />

            {/* Display Selected Rating */}
            <span
              className={`px-2 py-1 flex justify-center items-center rounded-full text-sm w-8 h-8 text-white ${getRatingColor(
                venue.rating
              )}`}
            >
              {venue.rating}
            </span>
          </div>
        </label>

        <H3 className="mt-3">Location</H3>

        {/* Location inputs */}
        <div className="grid grid-cols-2 gap-3">
          {locationFields.map(({ id, label, icon, type }) => (
            <div
              key={id}
              className={`
              ${["address", "city"].includes(id) ? "col-span-2" : "col-span-1"}
            `}
            >
              <Input
                InputId={`location.${id}`}
                InputLabel={label}
                icon={icon}
                type={type}
                register={register}
                errors={errors}
                onChange={(e) =>
                  updateVenue({
                    location: {
                      ...venue.location,
                      [id]:
                        type === "number"
                          ? Number(e.target.value)
                          : e.target.value
                    }
                  })
                }
              />
            </div>
          ))}
        </div>

        <H3 className="mt-3">Add images</H3>
        {/* Image uploader */}
        <ImageUploader
          media={venue.media}
          setMedia={(newMedia) => setVenue({ ...venue, media: newMedia })}
        />

        {/* Error Message Display */}
        {errorMessage && <P className="text-red-500 text-sm">{errorMessage}</P>}

        <div className="flex justify-center gap-2 mb-20">
          <Button
            buttonType="violetSecondary"
            className="mt-4"
            onClick={handlePreview}
          >
            Preview Venue
          </Button>
          {/* Submit Button */}
          <Button
            buttonType="violet"
            className="mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? <LoaderSmall /> : "Create Venue"}
          </Button>
        </div>

        {/* VenuePreview Modal */}
        {togglePreview && (
          <VenuePreview onClose={() => setTogglePreview(false)} />
        )}
      </form>
      {/* Success Message Modal */}
      {successMessage && (
        <Modal isOpen={true} onClose={() => setSuccessMessage(null)}>
          <div className="flex flex-col items-center gap-2 my-10 mb-14">
            <div className="w-16 h-16 bg-color1-100 dark:bg-color1-600 p-4 m-2 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="w-8 h-8 text-color1-500 dark:text-color1-200"
              />
            </div>
            <H2 className="md:text-4xl font-heading text-center font-semibold text-color1-600 dark:text-color1-200">
              {successMessage}
            </H2>
            <P className="mt-2 max-w-md text-center">
              Your venue has been successfully created!
            </P>
            <div className="flex flex-row gap-2 mt-3">
              <Link to={`/profile/venues`} className="">
                <Button
                  buttonType="violetSecondary"
                  onClick={() => setSuccessMessage(null)}
                >
                  View All Venues
                </Button>
              </Link>
              <Link to={`/venue/${venueId}`} className="">
                <Button buttonType="violet" className="">
                  Go To Venue
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default VenueForm;
