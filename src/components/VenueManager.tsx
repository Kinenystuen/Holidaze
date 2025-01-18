import { useEffect, useState } from "react";
import { useUserContext } from "./context/useUserContext";
import { apiHostUrl } from "./library/constants";
import { useApi } from "./hooks/UseApi";
import { User } from "./library/types";
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

  const { isLoading, isError, errorMessage, fetchData } = useApi<User>(
    apiUrl,
    { method: "PUT" },
    true
  );

  const handleRoleChange = async (newRole: boolean) => {
    setError("");

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

        // Update user context and localStorage
        const updatedUser = { ...user, venueManager: newRole };
        setUser(updatedUser);
        localStorage.setItem("profile", JSON.stringify(updatedUser));

        setError("");
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

      // Merge with current user state to prevent missing properties
      setUser((prevUser) => ({
        ...prevUser,
        ...parsedUser
      }));
    }
  }, [setUser]);

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
