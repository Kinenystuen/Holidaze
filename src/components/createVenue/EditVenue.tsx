import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiHostUrl } from "../library/constants";
import Modal from "../ui/Modal";
import Button from "../shared/Button/Button";
import { useApi } from "../hooks/UseApi";
import LoaderSmall from "../ui/LoaderSmall";
import P from "../shared/Typography/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import H2 from "../shared/Typography/H2";
import Input from "../ui/Input";
import MetaCheckbox from "../ui/MetaCheckbox";
import { Meta } from "../library/types";
import H3 from "../shared/Typography/H3";
import ImageUploader from "./ImageUploader";
import { Link } from "react-router-dom";

export interface VenueLocation {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created?: string;
  updated?: string;
  customer?: {
    name: string;
    email: string;
    avatar?: {
      url: string;
      alt?: string;
    };
  };
}

export interface Venue {
  id: string;
  name: string;
  description?: string;
  media?: { url: string; alt?: string }[];
  price: number;
  maxGuests: number;
  rating?: number;
  meta: Meta;
  location: VenueLocation;
  created?: string;
  updated?: string;
  bookings?: Booking[];
}

interface EditVenueProps {
  venue: Venue;
  onClose: () => void;
  onUpdate: () => void;
}

type VenueFormFields = keyof Venue | `location.${keyof VenueLocation}`;

/**
 * Edit Venue Component
 * - Displays a form for editing venue details.
 * - Uses react-hook-form for form handling.
 * - Uses useApi hook for updating venue data.
 * - @param {Venue} venue - The venue to edit.
 * - @param {() => void} onClose - Callback to close the modal.
 * - @param {() => void} onUpdate - Callback to update the venue list.
 * @component
 * @returns {JSX.Element} The EditVenue component.
 *
 */

const EditVenue: React.FC<EditVenueProps> = ({ venue, onClose, onUpdate }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [media, setMedia] = useState(
    (venue.media || []).map((item) => ({
      ...item,
      alt: item.alt || ""
    }))
  );

  // API Hook for updating venue
  const { response, fetchData } = useApi(
    `${apiHostUrl}/holidaze/venues/${venue.id}`,
    { method: "PUT" },
    false
  );

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

  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Venue>({
    defaultValues: venue
  });

  useEffect(() => {
    if (venue) {
      // Update all venue fields
      Object.keys(venue).forEach((key) => {
        if (key !== "media") {
          setValue(key as keyof Venue, venue[key as keyof Venue]);
        }
      });

      // Ensure media updates properly
      setMedia(
        (venue.media || []).map((item) => ({ ...item, alt: item.alt || "" }))
      );
      setValue("media", venue.media || [], { shouldValidate: true });
    }
  }, [venue, setValue]);

  // Form Submission Handler
  const onSubmit = async (data: Venue) => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const parsedData = {
        ...data,
        price: Number(data.price),
        maxGuests: Number(data.maxGuests),
        rating: Number(data.rating),
        location: {
          ...data.location,
          lat: Number(data.location.lat),
          lng: Number(data.location.lng)
        },
        media: media.filter((item) => item.url)
      };

      await fetchData({ body: JSON.parse(JSON.stringify(parsedData)) });
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error updating venue: ${error.message}`);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (response) {
      setSuccessMessage("Venue updated successfully!");
    }
  }, [response]);

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    onUpdate();
    onClose();
  };

  return (
    <>
      {/* Edit Venue Modal */}
      <Modal isOpen={true} onClose={onClose}>
        <H2>Edit Venue</H2>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <H3 className="mt-3">Venue Details</H3>
          {/* Venue Name */}
          <Input
            InputId="name"
            InputLabel="Venue Name"
            icon={faHouse}
            register={register}
            errors={errors}
            required
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
              className="peer w-full p-2 pl-10 pt-5 pb-2 border dark:bg-customBgDark-500 border-gray-300 dark:border-zinc-700 rounded-md"
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
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Price & Max Guests */}
          <div className="flex gap-4">
            <Input
              InputId="price"
              InputLabel="Price"
              icon={faMoneyCheckDollar}
              register={register}
              errors={errors}
              required
              onChange={(e) =>
                setValue("price", Number(e.target.value) || 0, {
                  shouldValidate: true
                })
              }
            />
            <Input
              InputId="maxGuests"
              InputLabel="Max Guests"
              icon={faUsers}
              register={register}
              errors={errors}
              required
              onChange={(e) =>
                setValue("maxGuests", Number(e.target.value) || 0, {
                  shouldValidate: true
                })
              }
            />
          </div>
          {/* Meta Options */}
          <H3 className="mt-3">Facilities</H3>
          <div className="grid grid-cols-2 gap-3">
            {metaKeys.map((key) => (
              <MetaCheckbox
                key={key}
                id={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                icon={metaIcons[key]}
                checked={
                  watch(`meta.${key}` as `meta.${keyof Venue["meta"]}`) ??
                  venue.meta[key]
                }
                onChange={(checked) =>
                  setValue(
                    `meta.${key}` as `meta.${keyof Venue["meta"]}`,
                    checked,
                    { shouldValidate: true }
                  )
                }
              />
            ))}
          </div>
          <H3 className="mt-3">Rating</H3>
          {/* Rating */}
          <label className="flex flex-col gap-2 w-full max-w-72 p-3 rounded-md border border-gray-300 dark:border-zinc-700  bg-white dark:bg-customBgDark-500 text-black dark:text-whiteFont-500 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faStar}
                className="h-4 w-4 transform text-gray-400 peer-focus:text-color4-700 dark:text-gray-500 dark:peer-focus:text-color4-600"
              />
              <span className="text-sm text-gray-400 font-medium">Rating:</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Controlled Range Slider */}
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                {...register("rating")}
                value={watch("rating")}
                onChange={(e) =>
                  setValue("rating", Number(e.target.value), {
                    shouldValidate: true
                  })
                }
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 
                 focus:outline-none focus:ring-2 focus:ring-color4-700 focus:border-color4-600"
              />

              {/* Display Selected Rating */}
              <span
                className={`px-2 py-1 flex justify-center items-center rounded-full text-sm w-8 h-8 text-white ${getRatingColor(
                  watch("rating") ?? 0
                )}`}
              >
                {watch("rating")}
              </span>
            </div>
          </label>

          {/* Location Fields */}
          <H3 className="mt-3">Location</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Location inputs */}
            {locationFields.map(({ id, label, icon, type }) => (
              <Input
                key={id}
                InputId={`location.${id}` as VenueFormFields}
                InputLabel={label}
                icon={icon}
                type={type}
                register={register}
                errors={errors}
              />
            ))}
          </div>
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Image Uploader */}
          <H3 className="mt-3">Add images</H3>
          <ImageUploader
            media={media}
            setMedia={setMedia}
            register={register}
            errors={errors}
          />
          {media.map((image, index) => (
            <input
              key={index}
              type="hidden"
              {...register(`media.${index}` as const)}
              value={JSON.stringify(image)}
            />
          ))}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button
              buttonType="violetSecondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button buttonType="violet" type="submit" disabled={isSaving}>
              {isSaving ? <LoaderSmall /> : "Save Changes"}
            </Button>
          </div>
        </form>
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
              Venue "{venue.name}" has been successfully updated.
            </P>
            <div className="flex gap-3 mt-4">
              <Button buttonType="violetSecondary" onClick={handleSuccessClose}>
                Edit Another
              </Button>
              <Link to={`/venue/${venue.id}`}>
                <Button buttonType="violet">View Venue</Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditVenue;
