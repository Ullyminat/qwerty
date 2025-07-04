import express from "express";
import AuthController from "../controllers/authController.mjs";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/me", AuthController.me);

export default router;