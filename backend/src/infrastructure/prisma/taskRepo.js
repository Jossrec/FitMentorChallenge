import {prisma} from "./client.js";
import { Task } from "../../domain/Task.js";

export async function createTask(data) {
  const task = await prisma.task.create({ data });
  return new Task(task);
}

export async function getTasks() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  return tasks.map(t => new Task(t));
}

export async function updateTask(id, data) {
  const task = await prisma.task.update({ where: { id }, data });
  return new Task(task);
}
