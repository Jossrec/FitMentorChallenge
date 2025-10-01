import { createBoard } from "../infrastructure/prisma/boardRepo.js";
import { Board } from "../domain/Board.js";

export async function createBoardUsecase(userId, name) {
  if (!Board.isValidName(name)) {
    throw new Error("Nombre inválido");
  }
  return await createBoard(userId, name);
}
