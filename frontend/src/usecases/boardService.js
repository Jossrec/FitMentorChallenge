import { api } from "../infrastructure/api";

// Listar tableros del usuario
export async function fetchBoardsServer() {
  const res = await api.get("/boards");
  return res.data;
}

// Crear tablero nuevo
export async function createBoardServer(name) {
  const res = await api.post("/boards", { name });
  return res.data;
}
