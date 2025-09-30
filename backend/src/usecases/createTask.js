import { createTask } from "../infrastructure/prisma/taskRepo.js";
import { Task } from "../domain/Task.js";

export async function createTaskUseCase(input) {
  const task = new Task(input);
  if (!task.isValid()) throw new Error("Título inválido");
  return await createTask(input);
}
