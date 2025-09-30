import { getTasks } from "../infrastructure/prisma/taskRepo.js";

export async function getTasksUseCase() {
  return await getTasks();
}
