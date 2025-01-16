import React, { useEffect, useState, useCallback } from "react";
import { INITIAL_USER } from "../library/constants";
import { User } from "../library/types";
import { AuthContext } from "./useUserContext";

/**
 * Provides authentication context for the application.
 *
 * - Manages user authentication state.
 * - Retrieves user details from `localStorage`.
 * - Checks for an authentication token to determine if the user is logged in.
 * - Updates the authentication status accordingly.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components wrapped by AuthProvider.
 * @returns {JSX.Element} The AuthContext provider with authentication state.
 */
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);

  /**
   * Retrieves the authentication token from `localStorage`.
   *
   * @returns {string | null} The authentication token, or `null` if not found.
   */
  const getToken = (): string | null => localStorage.getItem("token");

  /**
   * Fetches and parses user details from `localStorage`.
   *
   * @returns {User | null} The user details if found, otherwise `null`.
   */
  const fetchUserDetails = (): User | null => {
    try {
      const profile = localStorage.getItem("profile");
      if (!profile) return null;

      const data = JSON.parse(profile);
      return {
        name: data.name || "",
        email: data.email || "",
        avatarUrl: data.avatar?.url || "",
        bannerUrl: data.banner?.url || "",
        venueManager: data.venueManager || false
      };
    } catch (error) {
      console.error("Error parsing user profile from localStorage:", error);
      return null;
    }
  };

  /**
   * Checks whether the user is authenticated.
   *
   * - Retrieves the token from `localStorage`.
   * - Fetches user details and updates authentication state accordingly.
   *
   * @async
   * @function
   * @returns {Promise<boolean>} A promise that resolves to `true` if authenticated, `false` otherwise.
   */
  const checkAuthUser = useCallback(async (): Promise<boolean> => {
    // console.log("Checking authentication...");
    setIsPending(true);

    const token = getToken();

    if (!token) {
      //   console.log("No token found - User not authenticated");
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      setIsPending(false);
      return false;
    }

    const userDetails = fetchUserDetails();

    if (userDetails) {
      //   console.log("User found in localStorage - Authenticated", userDetails);
      setUser(userDetails);
      setIsAuthenticated(true);
    } else {
      //   console.log("User not found - Setting auth to false");
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
    }

    setIsPending(false);
    return !!userDetails;
  }, []);

  useEffect(() => {
    // console.log("AuthProvider Mounted - Running `checkAuthUser()`...");
    checkAuthUser();
  }, [checkAuthUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isPending,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
      }}
    >
      {isPending ? (
        <div className="flex justify-center items-center h-screen text-lg">
          Loading authentication...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
