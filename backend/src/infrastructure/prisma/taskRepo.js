import {prisma} from "./client.js";
import { Task } from "../../domain/Task.js";

export async function getTasksByBoard(boardId, userId) {
  const tasks = await prisma.task.findMany({
    where: { boardId: Number(boardId), board: { ownerId: userId } },
    orderBy: { id: "desc" },
  });
  return tasks.map(t => new Task(t));
}

export async function createTaskInBoard(boardId, userId, data) {
  const board = await prisma.board.findFirst({
    where: { id: Number(boardId), ownerId: userId },
  });
  if (!board) return null;

  // console.log("DATA AL CREAR:", data);
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      priority: data.priority ?? "Media",
      storyPoints: data.storyPoints ?? 1,
      status: data.status ?? "PENDIENTE",
      boardId: Number(boardId),
    },
  });
  return new Task(task);
}

export async function updateTaskOwned(taskId, userId, data) {
  const { count } = await prisma.task.updateMany({
    where: { id: Number(taskId), board: { ownerId: userId } },
    data: {
      title: data.title,
      description: data.description ?? null,
      priority: data.priority,
      storyPoints: data.storyPoints,
      status: data.status,
    },
  });
  return count;
}

export async function deleteTaskOwned(taskId, userId) {
  const { count } = await prisma.task.deleteMany({
    where: { id: Number(taskId), board: { ownerId: userId } },
  });
  return count;
}

export const taskRepo = {
  getTasksByBoard,
  createTaskInBoard,
  updateTaskOwned,
  deleteTaskOwned,
};
