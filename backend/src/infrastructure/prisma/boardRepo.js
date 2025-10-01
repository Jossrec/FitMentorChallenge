import {prisma} from "./client.js";
import { Board } from "../../domain/Board.js"; 

export async function listBoardsByUser(userId) {
  const boards = await prisma.board.findMany({
    where: { ownerId: userId },
    orderBy: { id: "desc" },
  });
  return boards.map(b => new Board(b));
}

export async function createBoard(userId, name) {
  const board = await prisma.board.create({
    data: { name: name.trim(), ownerId: userId },
  });
  return new Board(board);
}

export async function getBoardOwnedByUser(boardId, userId) {
  const board = await prisma.board.findFirst({
    where: { id: Number(boardId), ownerId: userId },
  });
  return board ? new Board(board) : null;
}

export async function ensureDefaultBoard(userId) {
  const board = await prisma.board.upsert({
    where: { ownerId_name: { ownerId: userId, name: "Mi Tablero" } },
    update: {},
    create: { name: "Mi Tablero", ownerId: userId },
  });
  return new Board(board);
}

export const boardRepo = {
  listBoardsByUser,
  createBoard,
  getBoardOwnedByUser,
  ensureDefaultBoard,
};