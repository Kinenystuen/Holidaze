import React, { useEffect, useState, useCallback } from "react";

import { INITIAL_USER } from "../library/constants";
import { User } from "../library/types";
import { AuthContext } from "./useUserContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Get the token from localStorage
  const getToken = () => localStorage.getItem("token");

  // Fetch user details from localStorage
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

  // Check if the user is authenticated
  const checkAuthUser = useCallback(async () => {
    setIsPending(true);
    const token = getToken();

    if (!token) {
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      setIsPending(false);
      return false;
    }

    const userDetails = fetchUserDetails();

    if (userDetails) {
      setUser(userDetails);
      setIsAuthenticated(true);
      setIsPending(false);
      return true;
    } else {
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      setIsPending(false);
      return false;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const isAuthenticated = await checkAuthUser();
      if (!isAuthenticated) {
        console.log("User is not authenticated");
      } else {
        console.log("User is authenticated");
      }
    };

    initializeAuth();
  }, [checkAuthUser]);

  const value = {
    user,
    setUser,
    isPending,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
