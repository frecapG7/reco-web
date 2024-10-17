import { Navigate } from "react-router-dom";
import { useAuthSession } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

export const AuthProtectedLayout = ({ children }) => {
  const { session } = useAuthSession();
  const loading = !session;

  if (loading) return <CircularProgress />;

  if (!session?.loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};
