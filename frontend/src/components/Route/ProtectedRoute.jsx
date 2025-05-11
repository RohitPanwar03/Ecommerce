import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.User);
  if (!isAuthenticated) {
    return navigate("/login");
  }
  return <Outlet />;
};

export default ProtectedRoute;
