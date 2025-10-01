import { jwtService } from "../infrastructure/jwtService.js";

export function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: "UNAUTHORIZED" });

    const payload = jwtService.verify(token);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (e) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }
}
