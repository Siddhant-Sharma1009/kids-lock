import express from "express";
import {
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

// PUBLIC
router.post("/login", login);
router.post("/logout", logout);

// 🔓 PUBLIC SIGNUP (FIX)
router.post("/register", register);

export default router;
