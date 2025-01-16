import { useState } from "react";
import { useUserContext } from "./context/useUserContext";
import { apiHostUrl } from "./library/constants";
import { useApi } from "./hooks/UseApi";
import { UserResponse } from "./library/types";
import H2 from "./shared/Typography/H2";
import P from "./shared/Typography/P";
import Button from "./shared/Button/Button";

/**
 * ProfileSettings component allows users to view and update their venue manager status.
 *
 * - Only users with an `@stud.noroff.no` email can upgrade/downgrade their status.
 * - Uses `useApi` for making a PUT request to update the user's role.
 * - Displays loading, error, and success messages based on API response.
 *
 * @component
 * @returns {JSX.Element} The Profile Settings UI.
 */
export function ProfileSettings() {
  const { user, setUser } = useUserContext();
  const [isVenueManager, setIsVenueManager] = useState(user.venueManager);
  const [error, setError] = useState("");

  const action = `/holidaze/profiles/${user.name}`;
  const apiUrl = `${apiHostUrl}${action}?_holidaze=true`;

  const { isLoading, isError, errorMessage, fetchData } = useApi<UserResponse>(
    apiUrl,
    { method: "PUT" },
    true
  );

  const handleRoleChange = async (newRole: boolean) => {
    setError("");

    // Check email domain
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
        setUser((prevUser) => ({ ...prevUser, venueManager: newRole }));
        setError("");
      } else {
        setError("Failed to update venue manager status.");
      }
    } catch (error) {
      console.error("Error during role change:", error);
      setError(errorMessage || "Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <H2>Profile Settings</H2>
      {isVenueManager ? (
        <>
          <P>You are a venue manager.</P>
          <div>
            <Button
              onClick={() => handleRoleChange(false)}
              disabled={isLoading}
            >
              {isLoading ? "Downgrading..." : "Downgrade"}
            </Button>
            {(isError || error) && (
              <P style={{ color: "red" }}>{errorMessage || error}</P>
            )}
          </div>
        </>
      ) : (
        <div>
          <P>Become a Venue Manager:</P>
          <Button onClick={() => handleRoleChange(true)} disabled={isLoading}>
            {isLoading ? "Upgrading..." : "Upgrade"}
          </Button>
          {(isError || error) && (
            <P style={{ color: "red" }}>{errorMessage || error}</P>
          )}
        </div>
      )}
    </div>
  );
}
