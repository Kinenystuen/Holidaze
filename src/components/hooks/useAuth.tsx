import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiHostUrl } from "../library/constants";
import { useUserContext } from "../context/useUserContext";
import { RegisterProfile, LoginProfile, User } from "../library/types";

const saveToStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * A reusable hook for handling authentication actions (e.g., register, login).
 *
 * @param {string} defaultAction - Default API endpoint for the authentication action.
 * @param {string} defaultRedirect - Default route to navigate after success.
 * @returns {Object} Methods and state for authentication actions.
 */
export const useAuth = (
  defaultAction: string = "/auth/login",
  defaultRedirect: string = "/profile"
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUserContext();

  /**
   * Handles authentication actions (register, login, etc.) by sending a request to the API.
   *
   * @param {RegisterProfile | LoginProfile} profile - The user profile data to send.
   * @param {string} [action] - The API endpoint for the authentication action.
   * @param {string} [successRedirect] - The route to navigate to after a successful request.
   * @returns {Promise<User | void>} - The user data on success or void on error.
   */
  const submitAuth = async (
    profile: RegisterProfile | LoginProfile,
    action?: string,
    successRedirect?: string
  ) => {
    setIsLoading(true);
    setError(null);
    let errorMessage = "";

    const authUrl = `${apiHostUrl}${action || defaultAction}?_holidaze=true`;
    console.log("Auth URL:", authUrl);

    const body = JSON.stringify(profile);

    try {
      const response = await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });

      if (response.ok) {
        const data = await response.json();
        const { accessToken, ...user } = data.data;
        console.log("User Data:", user);

        // Save token and user profile to localStorage
        saveToStorage("token", accessToken);
        saveToStorage("profile", user);

        // Update AuthProvider context
        setUser({
          name: user.name,
          email: user.email,
          bio: user.bio,
          avatar: {
            url: user.avatar?.url ?? "",
            alt: user.avatar?.alt ?? "User avatar"
          },
          banner: {
            url: user.banner?.url ?? "",
            alt: user.banner?.alt ?? "User banner"
          },
          venueManager: user.venueManager
        });
        setIsAuthenticated(true);

        // Navigate to the successRedirect route
        navigate(successRedirect || defaultRedirect);

        return user as User;
      } else {
        const errorResponse = await response.json();
        errorMessage =
          errorResponse.errors?.[0]?.message || "Authentication failed";
        setError(errorMessage);
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (err) {
      setError(`${errorMessage}. Please try again. `);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitAuth, isLoading, error };
};
