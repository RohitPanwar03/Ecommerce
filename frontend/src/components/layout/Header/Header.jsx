import { Link } from "react-router-dom";
import { IoIosSearch, IoIosCart } from "react-icons/io";
import { RiFileUserFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Header.css";

const Header = () => {
  return (
    <>
      <nav className="header">
        <div className="nav-logo"></div>
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
          <Link to={"/"}>
            <div>
              <IoIosCart />
              Cart
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
