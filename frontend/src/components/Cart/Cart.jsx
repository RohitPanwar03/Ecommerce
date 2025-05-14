import { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "../../reducers/cartReducer";
import Loader from "../layout/Loader/Loader";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);
  const { isAuthenticated, loading } = useSelector((state) => state.User);

  const increase = (id, quantity, stock) => {
    if (stock <= quantity) {
      return;
    }
    dispatch(increaseQuantity(id));
  };

  const decrease = (id, quantity) => {
    if (1 >= quantity) {
      return;
    }
    dispatch(decreaseQuantity(id));
  };

  const deleteCartItems = (id) => {
    dispatch(deleteItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {cartItem.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />

              <Typography>No Product in Your Cart</Typography>
              <Link to="/products">View Products</Link>
            </div>
          ) : (
            <Fragment>
              <div className="cartPage">
                <div className="cartHeader">
                  <p>Product</p>
                  <p>Quantity</p>
                  <p>Subtotal</p>
                </div>

                {cartItem &&
                  cartItem.map((item) => (
                    <div className="cartContainer" key={item.product}>
                      <CartItemCard
                        item={item}
                        deleteCartItems={deleteCartItems}
                      />
                      <div className="cartInput">
                        <button
                          onClick={() => decrease(item.product, item.quantity)}
                        >
                          -
                        </button>
                        <p type="number">{item.quantity}</p>
                        <button
                          onClick={() =>
                            increase(item.product, item.quantity, item.stock)
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className="cartSubtotal">{`₹${
                        item.price * item.quantity
                      }`}</p>
                    </div>
                  ))}

                <div className="cartGrossProfit">
                  <div></div>
                  <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{`₹${cartItem.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}`}</p>
                  </div>
                  <div></div>
                  {!isAuthenticated && !loading ? (
                    <div className="checkOutBtn">
                      <button
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Login to CheckOut
                      </button>
                    </div>
                  ) : (
                    <div className="checkOutBtn">
                      <button onClick={checkoutHandler}>Check Out</button>
                    </div>
                  )}
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
