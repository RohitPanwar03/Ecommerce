import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.User);
  if (!isAuthenticated && user.role !== "admin") {
    return navigate("/");
  }
  return <Outlet />;
};

export default AdminRoute;
