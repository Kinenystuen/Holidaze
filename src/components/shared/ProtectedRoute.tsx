import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";

/**
 * A wrapper for protected routes that checks for authentication.
 *
 * @component
 * @param {Object} children - The child components to render if authenticated.
 * @returns {JSX.Element} The rendered ProtectedRoute component
 */

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isPending } = useUserContext();

  // Wait until authentication is checked before rendering
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Checking authentication...
      </div>
    );
  }

  // Redirect to login if authentication fails
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
