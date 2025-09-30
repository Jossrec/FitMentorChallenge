import { createTaskUseCase } from "../usecases/createTask.js";
import { getTasksUseCase } from "../usecases/getTask.js";
import { updateTaskUseCase } from "../usecases/updateTask.js";

export async function createTask(req, res) {
  try {
    const task = await createTaskUseCase(req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getTasks(req, res) {
  const tasks = await getTasksUseCase();
  res.json(tasks);
}

export async function updateTask(req, res) {
  try {
    const task = await updateTaskUseCase(parseInt(req.params.id), req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
