import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faImage, faPen } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../../components/context/useUserContext";
import Modal from "../../../components/ui/Modal";
import H2 from "../../../components/shared/Typography/H2";
import Input from "../../../components/ui/Input";
import { useApi } from "../../../components/hooks/UseApi";
import { apiHostUrl } from "../../../components/library/constants";
import { EditUserProfile } from "../../../components/library/types";
import H1 from "../../../components/shared/Typography/H1";
import P from "../../../components/shared/Typography/P";

/**
 * EditProfile Component
 *
 * Allows users to edit their profile information including bio, avatar, and banner images.
 * Uses React Hook Form for controlled input handling and a live preview of the updated profile.
 *
 * @component
 * @returns {JSX.Element} The EditProfile component.
 */
const EditProfile = () => {
  const { user, setUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  // Local state for live preview
  const [preview, setPreview] = useState({
    bio: user.bio || "",
    avatarUrl: user.avatar?.url || "",
    bannerUrl: user.banner?.url || ""
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditUserProfile>({
    defaultValues: {
      bio: user.bio || "",
      avatar: {
        url: user.avatar?.url || "",
        alt: user.avatar?.alt || `${user.name} avatar`
      },
      banner: {
        url: user.banner?.url || "",
        alt: user.banner?.alt || `${user.name} banner`
      },
      venueManager: user.venueManager || false
    }
  });

  // API Hook for Updating Profile
  const { fetchData, isLoading, isError, errorMessage } = useApi(
    `${apiHostUrl}/holidaze/profiles/${user.name}`,
    { method: "PUT" },
    true
  );

  // Handle Profile Update
  const onSubmit: SubmitHandler<EditUserProfile> = async (data) => {
    const formattedData = {
      bio: data.bio,
      avatar: {
        url: data.avatar.url,
        alt: `${user.name} avatar`
      },
      banner: {
        url: data.banner.url,
        alt: `${user.name} banner`
      },
      venueManager: data.venueManager
    };

    const result = await fetchData({
      body: JSON.parse(JSON.stringify(formattedData))
    });

    if (result) {
      setUser((prevUser) => ({
        ...prevUser,
        bio: data.bio,
        avatar: { url: data.avatar.url, alt: `${prevUser.name} avatar` },
        banner: { url: data.banner.url, alt: `${prevUser.name} banner` },
        venueManager: data.venueManager
      }));
      setIsOpen(false);
    }
  };

  return (
    <div>
      {/* Open Modal Button */}
      <Button
        buttonType="violet"
        className="px-4 py-2"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faEdit} className="mr-2" />
        Edit Profile
      </Button>

      {/* Modal for Editing Profile */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="md:p-6 flex flex-col items-center w-full">
          <H2 className="md:text-4xl font-heading font-semibold text-color1-600 dark:text-color1-200">
            Edit Profile
          </H2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg mt-6 space-y-4"
          >
            {/* Bio */}
            <Input
              InputId="bio"
              InputLabel="Bio"
              icon={faPen}
              register={register}
              errors={errors}
              onChange={(e) =>
                setPreview((prev) => ({ ...prev, bio: e.target.value }))
              }
            />

            {/* Avatar */}
            <Input
              InputId="avatar.url"
              InputLabel="Avatar URL"
              icon={faImage}
              register={register}
              errors={errors}
              onChange={(e) =>
                setPreview((prev) => ({ ...prev, avatarUrl: e.target.value }))
              }
            />

            {/* Banner */}
            <Input
              InputId="banner.url"
              InputLabel="Banner URL"
              register={register}
              icon={faImage}
              errors={errors}
              onChange={(e) =>
                setPreview((prev) => ({ ...prev, bannerUrl: e.target.value }))
              }
            />

            {/* Error Message */}
            {isError && <p className="text-red-500 text-sm">{errorMessage}</p>}

            {/* Submit Button */}
            <Button type="submit" buttonType="violet" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>

          {/* Live Profile Preview */}
          <div className="mt-6 flex flex-col w-full max-w-2xl items-center border border-color1-100 dark:border-color1-900 rounded-lg p-6">
            {/* Profile Preview Card */}
            <div className="relative flex flex-col h-fit bg-white dark:bg-customBgDark-500 shadow-sm rounded-xl w-full items-center">
              {/* Banner Preview */}
              <div className="w-full h-44 sm:h-16 bg-gray-200 dark:bg-gray-800 rounded-t-xl overflow-hidden">
                {preview.bannerUrl && (
                  <img
                    src={preview.bannerUrl}
                    alt="Banner Preview"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

              {/* Avatar and Info */}
              <div className="relative flex flex-col sm:flex-row items-center justify-center w-full">
                {/* Avatar Preview */}
                <div className="min-h-[8rem] sm:h-full sm:min-w-60 sm:min-h-40 flex-1 px-6 sm:w-fit p-2 sm:my-4 max-w-72 rounded-xl overflow-hidden">
                  {preview.avatarUrl && (
                    <img
                      src={preview.avatarUrl}
                      alt="Avatar Preview"
                      className="absolute top-[-8rem] sm:top-[-1.5rem] left-1/2 transform -translate-x-1/2 sm:left-6 sm:translate-x-0 w-64 xs:w-72 h-60 sm:w-52 sm:h-52 rounded-xl object-cover border-4 border-white dark:border-gray-800"
                    />
                  )}
                </div>

                {/* User Info Preview */}
                <div className="flex flex-grow flex-col justify-center items-center sm:items-start text-center sm:text-start mb-4 sm:ml-1">
                  <H1 className="font-heading">{user.name}</H1>
                  <span className="text-sm font-thin">{user.email}</span>
                  <P className="mt-4 max-w-72">{preview.bio}</P>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfile;
