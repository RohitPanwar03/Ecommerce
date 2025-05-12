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

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, error, loading } = useSelector(
    (state) => state.User
  );
  useEffect(() => {
    store.dispatch(loadUser());
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
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
