import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.User);
  console.log(user);
  if (!isAuthenticated || user.role !== "admin") {
    toast.error("This Route is Only Available for Admins");
    return navigate("/login");
  }
  return <Outlet />;
};

export default AdminRoute;
