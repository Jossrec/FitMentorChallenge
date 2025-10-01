import { getTasksUsecase } from "../usecases/getTask.js";
import { createTaskUsecase } from "../usecases/createTask.js";
import { updateTaskUsecase } from "../usecases/updateTask.js";
import { deleteTaskUsecase } from "../usecases/deleteTask.js";

export async function getTasks(req, res) {
  const userId = req.user.id;
  const { boardId } = req.params;
  const tasks = await getTasksUsecase(boardId, userId);
  return res.json(tasks);
}

export async function createTask(req, res) {
  const userId = req.user.id;
  const { boardId } = req.params;

  try {
    const task = await createTaskUsecase(boardId, userId, req.body || {});
    if (!task) return res.status(403).json({ error: "No autorizado" });
    return res.status(201).json(task);
  } catch (e) {
    if (e.message === "INVALID_TASK") {
      return res.status(400).json({ error: "Datos inválidos" });
    }
    console.error(e);
    res.status(500).json({ error: "Error interno" });
  }
}

export async function updateTask(req, res) {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const count = await updateTaskUsecase(id, userId, req.body || {});
    if (!count) return res.status(404).json({ error: "No encontrado" });
    return res.json({ ok: true });
  } catch (e) {
    if (e.message === "INVALID_TASK") {
      return res.status(400).json({ error: "Datos inválidos" });
    }
    console.error(e);
    res.status(500).json({ error: "Error interno" });
  }
}

export async function deleteTask(req, res) {
  const userId = req.user.id;
  const { id } = req.params;
  const count = await deleteTaskUsecase(id, userId);
  if (!count) return res.status(404).json({ error: "No encontrado" });
  return res.json({ ok: true });
}
