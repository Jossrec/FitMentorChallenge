import { deleteTask } from "../infrastructure/prisma/taskRepo.js";

export async function deleteTaskUseCase(id) {
  return await deleteTask(id);
}
