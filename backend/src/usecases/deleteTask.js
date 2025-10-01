import { taskRepo } from "../infrastructure/prisma/taskRepo.js";

export async function deleteTaskUsecase(taskId, userId) {
  return await taskRepo.deleteTaskOwned(taskId, userId);
}
