import { taskRepo } from "../infrastructure/prisma/taskRepo.js";
import { Task } from "../domain/Task.js";

export async function updateTaskUsecase(taskId, userId, data) {
  const t = new Task({ ...data, id: taskId });
  if (!t.isValid()) throw new Error("INVALID_TASK");

  return await taskRepo.updateTaskOwned(taskId, userId, data);
}
