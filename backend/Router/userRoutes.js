import express from "express";
import {
  LoginController,
  registerController,
  getMyDetails,
  updateUserDetails,
  deleteUser,
  updateUserRole,
  logoutUser,
} from "../controllers/userControllers.js";
import {
  authorizedRole,
  isAuthenticated,
} from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", LoginController);
router.get("/me", isAuthenticated, getMyDetails);
router.put("/update-user-details", isAuthenticated, updateUserDetails);
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizedRole("admin"),
  deleteUser
);
router.put(
  "/update-user-role/:id",
  isAuthenticated,
  authorizedRole("admin"),
  updateUserRole
);

router.get("/logout", isAuthenticated, logoutUser);

export default router;
