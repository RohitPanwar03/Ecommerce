import express from "express";
import {
  authorizedRole,
  isAuthenticated,
} from "../middlewares/isAuthenticated.js";
import {
  createOrder,
  getMyOrder,
  getSingleOrder,
  updateOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/new", isAuthenticated, createOrder);
router.get("/single-order/:id", isAuthenticated, getSingleOrder);
router.get("/myOrder", isAuthenticated, getMyOrder);
router.get(
  "/getAll-Orders",
  isAuthenticated,
  authorizedRole("admin"),
  getMyOrder
);
router.put(
  "/update-Order/:id",
  isAuthenticated,
  authorizedRole("admin"),
  updateOrders
);

export default router;
