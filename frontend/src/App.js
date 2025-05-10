import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer/Footer";
import NotFound from "./components/layout/Not Found/NotFound";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
