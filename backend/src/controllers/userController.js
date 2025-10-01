import { loginUser } from "../usecases/loginUser.js";
import { createUser } from "../usecases/createUser.js";
import { jwtService } from "../infrastructure/jwtService.js";
import { ensureDefaultBoard } from "../infrastructure/prisma/boardRepo.js";


export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const out = await loginUser({ email, password });
    await ensureDefaultBoard(out.user.id);
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

    // 1. Crear usuario (usa el usecase que valida email y contraseña)
    const user = await createUser({ email, password });
    // 2. Generar board por defecto
    await ensureDefaultBoard(user.id);
    // 3. Generar token de acceso
    const token = jwtService.sign({ id: user.id, email: user.email });

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (e) {
    if (e.message === "INVALID_EMAIL") {
      return res.status(400).json({ error: "Email inválido" });
    }
    if (e.message === "WEAK_PASSWORD") {
      return res.status(400).json({ error: "Contraseña mínima 6 caracteres" });
    }
    if (e.message === "EMAIL_ALREADY_IN_USE") {
      return res.status(409).json({ error: "Email ya registrado" });
    }

    console.error(e);
    res.status(500).json({ error: "Error interno" });
  }
}

