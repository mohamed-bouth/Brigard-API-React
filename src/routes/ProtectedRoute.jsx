import { Navigate } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, authLoading } = useAuth();

  if (authLoading) {
    return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
    </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}