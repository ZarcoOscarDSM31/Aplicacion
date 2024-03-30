import express from "express";
import {
  register,
  login,
  verifyToken,
  logout,
  update,
  getall,
  getone,
  deleteone,
} from "../controllers/auth.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verifyToken", verifyToken);
router.post("/logout", logout);


router.put("/update/:id", update);
router.get("/getall", getall);
router.get("/getone/:id", getone);
router.delete("/deleteone/:id", deleteone);

export default router;
