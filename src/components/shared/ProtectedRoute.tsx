import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";

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
