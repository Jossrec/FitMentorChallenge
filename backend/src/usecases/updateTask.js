import { updateTask } from "../infrastructure/prisma/taskRepo.js";

export async function updateTaskUseCase(id, input) {
  return await updateTask(id, input);
}
