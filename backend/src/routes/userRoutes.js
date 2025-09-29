import { Router } from "express";
import { loginController, registerController } from "../controllers/userController.js";

const router = Router();
router.post("/login", loginController);
router.post("/register", registerController); // opcional para crear el primer usuario
export default router;
