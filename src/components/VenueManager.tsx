import { useEffect, useState } from "react";
import { useUserContext } from "./context/useUserContext";
import { apiHostUrl } from "./library/constants";
import { useApi } from "./hooks/UseApi";
import { User } from "./library/types";
import H2 from "./shared/Typography/H2";
import P from "./shared/Typography/P";
import Button from "./shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/**
 * ProfileSettings - Allows users to update their venue manager status.
 * - Users with `@stud.noroff.no` email can upgrade/downgrade.
 * - Uses `useApi` to send a PUT request.
 * - Displays loading, success, and error messages.
 *
 *  * @component
 * @returns {JSX.Element} The Profile Settings UI.
 */
export function ProfileSettings() {
  const { user, setUser } = useUserContext();
  const [isVenueManager, setIsVenueManager] = useState(user.venueManager);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const apiUrl = `${apiHostUrl}/holidaze/profiles/${user.name}?_holidaze=true`;

  const { isLoading, errorMessage, fetchData } = useApi<User>(
    apiUrl,
    { method: "PUT" },
    true
  );

  const handleRoleChange = async (newRole: boolean) => {
    setError("");
    setSuccessMessage("");

    if (!user.email.endsWith("@stud.noroff.no")) {
      setError(
        "Only @stud.noroff.no email addresses can change venue manager status."
      );
      return;
    }

    try {
      const result = await fetchData({ body: { venueManager: newRole } });

      if (result?.data) {
        setIsVenueManager(newRole);
        const updatedUser = { ...user, venueManager: newRole };
        setUser(updatedUser);
        localStorage.setItem("profile", JSON.stringify(updatedUser));

        setSuccessMessage(
          newRole
            ? "You are now a Venue Manager!"
            : "You have downgraded successfully."
        );
      } else {
        setError("Failed to update venue manager status.");
      }
    } catch (error) {
      console.error("Error during role change:", error);
      setError(errorMessage || "Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser((prevUser) => ({
        ...prevUser,
        ...parsedUser
      }));
    }
  }, [setUser]);

  return (
    <div className="flex flex-col min-h-screen px-6 pb-6">
      <div className="w-full max-w-lg rounded-lg">
        <H2 className="text-2xl font-bold">Profile Settings</H2>
        <P className="mb-6">
          Manage your account settings and venue manager status.
        </P>

        {/* Venue Manager Status */}
        <div className="flex flex-col items-center bg-gray-100 dark:bg-customBgDark-500 p-6 rounded-lg shadow-inner">
          <FontAwesomeIcon
            icon={isVenueManager ? faCheckCircle : faTimesCircle}
            className={`text-4xl ${
              isVenueManager ? "text-green-500" : "text-customBgDark-400"
            } mb-3`}
          />
          <P className="text-lg font-medium text-gray-900 dark:text-white">
            {isVenueManager
              ? "You are a Venue Manager."
              : "You are not a Venue Manager."}
          </P>
          {isVenueManager && (
            <Link to="/profile/create-venue" className="mt-4">
              <Button buttonType="violet" className=" px-4 inline-block">
                Create New Venue
              </Button>
            </Link>
          )}
        </div>

        {/* Error Message */}
        {error && <P className="text-start mt-4">{error}</P>}

        {/* Success Message */}
        {successMessage && <P className="text-start mt-4">{successMessage}</P>}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-start">
          <Button
            buttonType={isVenueManager ? "violetSecondary" : "violet"}
            onClick={() => handleRoleChange(!isVenueManager)}
            disabled={isLoading}
            className="flex items-center"
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon
                  icon={faSyncAlt}
                  className="animate-spin mr-2"
                />
                Processing...
              </>
            ) : isVenueManager ? (
              "Downgrade to Regular User"
            ) : (
              "Upgrade to Venue Manager"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
