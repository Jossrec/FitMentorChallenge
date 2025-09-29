import { loginUser } from "../usecases/loginUser.js";
import { createUser } from "../usecases/createUser.js";
import { userRepo } from "../infrastructure/prisma/userRepo.js";
import { authService } from "../infrastructure/authService.js";
import { jwtService } from "../infrastructure/jwtService.js";

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const out = await loginUser(userRepo, authService, jwtService, { email, password });
    res.json(out);
  } catch (e) {
    if (e.message === "EMAIL_PASSWORD_REQUIRED") return res.status(400).json({ error: "Email y password requeridos" });
    if (e.message === "INVALID_CREDENTIALS") return res.status(401).json({ error: "Credenciales inválidas" });
    console.error(e);
    res.status(500).json({ error: "Error interno" });
  }
}

export async function registerController(req, res) {
  try {
    const { email, password } = req.body;
    const out = await createUser(userRepo, authService, { email, password });
    res.status(201).json(out);
  } catch (e) {
    if (e.message === "INVALID_EMAIL") return res.status(400).json({ error: "Email inválido" });
    if (e.message === "WEAK_PASSWORD") return res.status(400).json({ error: "Contraseña mínima 6 caracteres" });
    if (e.message === "EMAIL_ALREADY_IN_USE") return res.status(409).json({ error: "Email ya registrado" });
    console.error(e);
    res.status(500).json({ error: "Error interno" });
  }
}
