
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const RequirePermission = ({ children, permission }: { children: ReactNode, permission: string }) => {
  const { hasPermission, isAuthenticated } = useAuth(); 
  
  if (isAuthenticated && !hasPermission(permission)) {
    return <Navigate to="/" replace />; // Lo mandamos al Dashboard si no tiene permiso
  }
  return <>{children}</>;
};

export default RequirePermission;
