import express from "express";
import {
  LoginController,
  registerController,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", LoginController);

export default router;
