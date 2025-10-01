import { api } from "../infrastructure/api";

// Consultar tareas de un board
export async function fetchTasksServer(boardId) {
  const res = await api.get(`/boards/${boardId}/tasks`);
  return res.data;
}

// Crear tarea en un board
export async function createTaskServer(boardId, task) {
  const res = await api.post(`/boards/${boardId}/tasks`, task);
  return res.data;
}

// Actualizar tarea (usa PATCH, no PUT)
export async function updateTaskServer(id, patch) {
  const res = await api.patch(`/tasks/${id}`, patch);
  return res.data;
}

// Eliminar tarea
export async function deleteTaskServer(id) {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
}
