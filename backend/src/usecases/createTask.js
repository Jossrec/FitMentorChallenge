import { taskRepo } from "../infrastructure/prisma/taskRepo.js";
import { Task } from "../domain/Task.js";

export async function createTaskUsecase(boardId, userId, data) {
  const task = new Task({
    ...data,
    boardId,
  });

  if (!task.isValid()) {
    throw new Error("INVALID_TASK");
  }

  return await taskRepo.createTaskInBoard(boardId, userId, data);
}
