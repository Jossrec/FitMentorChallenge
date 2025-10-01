import { boardRepo } from "../infrastructure/prisma/boardRepo.js";

export async function getBoardsUsecase(userId) {
  return await boardRepo.listBoardsByUser(userId);
}
