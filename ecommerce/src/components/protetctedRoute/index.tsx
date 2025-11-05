// src/components/ProtectedRoute.tsx

import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
  element: ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Verificando autenticação...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return element;
};
