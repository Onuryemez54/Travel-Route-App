import type { ReactNode } from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";

export const ProtectedAppPage = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
