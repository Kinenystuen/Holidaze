import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />; // Redirect to login if not authenticated
  }

  return children;
};

export default ProtectedRoute;
