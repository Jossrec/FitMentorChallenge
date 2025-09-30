import { api } from "../infrastructure/api";

// Consultar tareas en el server
export async function fetchTasksServer() {
  const res = await api.get("/tasks");
  return res.data;
}

// Crear en el server
export async function createTaskServer(task) {
  const res = await api.post("/tasks", task);
  return res.data;
}

// Actualizar en el server
export async function updateTaskServer(id, patch) {
  const res = await api.put(`/tasks/${id}`, patch);
  return res.data;
}

// Eliminar en el server
export async function deleteTaskServer(id) {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
}
