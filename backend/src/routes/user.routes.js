import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import {
  getExitSequence,
  updateExitSequence
} from "../controllers/user.controller.js";

const router = express.Router();

router.get(
  "/exit-sequence",
  authMiddleware,
  roleMiddleware("PARENT"),
  getExitSequence
);

router.put(
  "/exit-sequence",
  authMiddleware,
  roleMiddleware("PARENT"),
  updateExitSequence
);

export default router;
