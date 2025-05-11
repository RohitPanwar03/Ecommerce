import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../reducers/productReducer";
import Loader from "../layout/Loader/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]); // Run only once

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]); // Handle error separately

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
        {loading ? (
          <Loader />
        ) : (
          products &&
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
