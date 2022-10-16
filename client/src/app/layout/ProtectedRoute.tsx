import { Navigate } from "react-router-dom";
import { User } from "../models/user";

interface Props {
  user: User | null;
  children: any;
}

const ProtectedRoute = ({ user, children }: Props) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
