import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useAuth } from "@/utils/useAuth";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log("isAuthenticated", isAuthenticated);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
