import { Link } from "react-router-dom";
import { IoIosSearch, IoIosCart } from "react-icons/io";
import { RiFileUserFill } from "react-icons/ri";
import "./Header.css";

const PhoneHeader = ({ toggleNav }) => {
  return (
    <div className={`navigation ${toggleNav ? "showNav" : ""}`}>
      <div className="phone-header">
        <div className="first-links">
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>Products</Link>
          <Link to={"/"}>Contact</Link>
          <Link to={"/"}>About</Link>
        </div>
        <div className="last-links">
          <Link to={"/"}>
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
          <Link to={"/"}>
            <div>
              <RiFileUserFill />
              Profile
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhoneHeader;
