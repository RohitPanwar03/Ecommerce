import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logOut } from "../../../reducers/UserReducer";
import Loader from "../Loader/Loader";

const UserOptions = ({ user, loading }) => {
  const { cartItem } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItem.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart${" " + cartItem.length}`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user && user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logOut());
    toast.success("Logout Successfully");
    navigate("/login");
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Backdrop open={open} style={{ zIndex: "10" }} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ zIndex: "11" }}
            open={open}
            direction="down"
            className="speedDial"
            icon={
              <img
                className="speedDialIcon"
                src={user?.avatar?.url}
                alt="Profile"
              />
            }
          >
            {options.map((item) => (
              <SpeedDialAction
                tooltipTitle={item.name}
                key={item.name}
                icon={item.icon}
                onClick={item.func}
              />
            ))}
          </SpeedDial>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserOptions;
