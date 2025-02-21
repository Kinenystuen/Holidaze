import { useEffect } from "react";
import { useApi } from "../hooks/UseApi";
import { useUserContext } from "./useUserContext";
import { apiHostUrl } from "../library/constants";
import { UserProfile } from "../library/types";

import ErrorMessage from "../shared/ErrorMessage";
import Loader from "../ui/Loader";

/**
 * FetchProfileData Component
 * - Fetches the user's profile data and updates the global user state.
 * - Uses `useApi` to fetch data.
 * - @component
 * @returns {JSX.Element} The FetchProfileData component.
 */

const FetchProfileData: React.FC<{
  children: (response: UserProfile | null) => React.ReactNode;
}> = ({ children }) => {
  const { user, setUser } = useUserContext();

  const { response, isError, errorMessage, fetchData, isLoading } =
    useApi<UserProfile>(
      `${apiHostUrl}/holidaze/profiles/${user.name}?_holidaze=true`,
      {},
      true // Manual fetch mode
    );

  // Fetch data on component mount
  useEffect(() => {
    if (user?.name) {
      fetchData();
    }
  }, [user.name, fetchData]);

  // Update global user state when new data is available
  useEffect(() => {
    if (response?.data) {
      setUser((prevUser) => ({
        ...prevUser,
        ...response.data
      }));
    }
  }, [response?.data, setUser]);

  // Handle loading & errors
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage message={errorMessage || "Failed to fetch profile."} />
    );

  return response?.data ? <>{children(response.data)}</> : null;
};

export default FetchProfileData;
