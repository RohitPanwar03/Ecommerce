import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer/Footer";
import NotFound from "./components/layout/Not Found/NotFound";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import LoginSignUp from "./components/User/loginSignup";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Profile from "./components/User/Profile";
import UserOptions from "./components/layout/Header/userOptions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearErrors, loadUser } from "./reducers/UserReducer";
import { store } from "./redux/store";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import UpdateProfile from "./components/User/UpdateProfile";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import { useState } from "react";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import AdminRoute from "./components/Route/AdminRoute";
import Dashboard from "./components/Admin/Dashboard";
import NewProduct from "./components/Admin/NewProduct";
import ProductList from "./components/Admin/ProductList";
import OrderList from "./components/Admin/OrderList";
import UsersList from "./components/Admin/UserLists";
import UpdateUser from "./components/Admin/UpdateUser";
import ProcessOrder from "./components/Admin/ProcessOrder";

function App() {
  const dispatch = useDispatch();
  const [stripeApikey, setStripeApikey] = useState("");
  const { isAuthenticated, user, error, loading } = useSelector(
    (state) => state.User
  );

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/payment/stripekey");
    setStripeApikey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [error]);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} loading={loading} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products/" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route
            path="/process/payment"
            element={
              stripeApikey && (
                <Elements stripe={loadStripe(stripeApikey)}>
                  <Payment />
                </Elements>
              )
            }
          />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/products" element={<ProductList />}></Route>
          <Route path="/admin/product" element={<NewProduct />}></Route>
          <Route path="/admin/orders" element={<OrderList />}></Route>
          <Route path="/admin/order/:id" element={<ProcessOrder />}></Route>
          <Route path="/admin/users" element={<UsersList />}></Route>
          <Route path="/admin/user/:id" element={<UpdateUser />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
