import express from "express";
import {
  LoginController,
  registerController,
  getMyDetails,
  updateUserDetails,
  deleteUser,
  updateUserRole,
  logoutUser,
  updateUserPassword,
  getAllUsers,
  getSingleUser,
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
router.put("/update-user-password", isAuthenticated, updateUserPassword);
router.get(
  "/getAll-users",
  isAuthenticated,
  authorizedRole("admin"),
  getAllUsers
);
router.get(
  "/getSingle-user/:id",
  isAuthenticated,
  authorizedRole("admin"),
  getSingleUser
);

router.get("/logout", isAuthenticated, logoutUser);

export default router;
