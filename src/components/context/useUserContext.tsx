import { createContext, useContext } from "react";
import { INITIAL_USER } from "../library/constants";
import { User } from "../library/types";

const INITIAL_STATE = {
  user: INITIAL_USER,
  isPending: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean
};

export type IContextType = {
  user: User;
  isPending: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export const AuthContext = createContext<IContextType>(INITIAL_STATE);

/**
 * useUserContext Hook
 *
 * A custom hook to access the user authentication context.
 * This hook ensures that the `AuthContext` is being used within an `AuthProvider`.
 * If it is used outside of an `AuthProvider`, it will throw an error.
 *
 * @returns {AuthContextType} The current authentication context, including user information and authentication methods.
 *
 * @throws {Error} If the hook is called outside an `AuthProvider`.
 *
 * @example
 * ```tsx
 * const { user, setUser, isAuthenticated } = useUserContext();
 *
 * if (isAuthenticated) {
 *   console.log("Logged in user:", user);
 * }
 * ```
 */

export const useUserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within an AuthProvider");
  }
  return context;
};
