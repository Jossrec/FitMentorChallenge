import { taskRepo } from "../infrastructure/prisma/taskRepo.js";

export async function getTasksUsecase(boardId, userId) {
  return await taskRepo.getTasksByBoard(boardId, userId);
}
