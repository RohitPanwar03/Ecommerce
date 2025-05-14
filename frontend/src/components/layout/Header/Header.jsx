import { Link } from "react-router-dom";
import { IoIosSearch, IoIosCart } from "react-icons/io";
import { RiFileUserFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Header.css";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import logo from "../../../images/logo.png";

const Header = () => {
  const { cartItem } = useSelector((state) => state.cart);
  return (
    <>
      <nav className="header">
        <img className="nav-logo" src={logo} alt="logo" />

        <div className="nav-middlelinks">
          <Link to={"/"}>Home</Link>
          <Link to={"/products"}>Products</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/about"}>About</Link>
        </div>
        <div className="nav-rightlinks">
          <Link to={"/search"}>
            <div>
              <IoIosSearch />
              Search
            </div>
          </Link>
          <Link to={"/cart"}>
            <div>
              <Badge badgeContent={cartItem?.length} color="primary" showZero>
                <IoIosCart />
              </Badge>
            </div>
          </Link>
          <Link to={"/login"}>
            <div>
              <RiFileUserFill />
              Profile
            </div>
          </Link>
        </div>
      </nav>
      <div className="hamburger">
        <GiHamburgerMenu />
      </div>
    </>
  );
};

export default Header;
