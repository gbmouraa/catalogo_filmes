import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import Loader from "../components/Loader";

function Private({ children }) {
  const { loading, signed } = useContext(AuthContext);

  if (loading) return <Loader />;

  if (!signed) return <Navigate to="/login" />;

  return children;
}

export default Private;
