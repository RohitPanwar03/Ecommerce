import express from "express";
import {
  authorizedRole,
  isAuthenticated,
} from "../middlewares/isAuthenticated.js";
import {
  AllProductsWithFilter,
  createProduct,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProductReviews,
  getSingleProduct,
  productReview,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/create-product",
  isAuthenticated,
  authorizedRole("admin"),
  createProduct
);
router.get(
  "/getAll-products",
  isAuthenticated,
  authorizedRole("admin"),
  getAllProducts
);
router.get("/getSingle-product/:id", getSingleProduct);
router.get("/All-products", AllProductsWithFilter);
router.put(
  "/update/:id",
  isAuthenticated,
  authorizedRole("admin"),
  updateProduct
);
router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizedRole("admin"),
  deleteProduct
);
router.put("/review", isAuthenticated, productReview);
router.put("/review", isAuthenticated, productReview);
router.get("/reviews", getProductReviews);
router.delete("/reviews", isAuthenticated, deleteReview);

export default router;
