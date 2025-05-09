import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";

const Home = () => {
  const product = {
    name: "Blue Shirt",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webo" }],
    price: "$200",
    _id: "abhishek",
  };
  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Product</h2>
      <div className="container" id="container">
        <ProductCard product={product} />
      </div>
    </>
  );
};

export default Home;
