import { createBoardUsecase } from "../usecases/createBoard.js";
import { getBoardsUsecase } from "../usecases/getBoards.js";

export async function getBoards(req, res) {
  const userId = req.user.id;
  try {
    const boards = await getBoardsUsecase(userId);

    // Serializar objetos Board a JSON limpio
    return res.json(
      boards.map(b => ({
        id: b.id,
        name: b.name,
        createdAt: b.createdAt,
        ownerId: b.ownerId,
      }))
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener tableros" });
  }
}

export async function postBoard(req, res) {
  const userId = req.user.id;
  const { name } = req.body || {};
  try {
    const board = await createBoardUsecase(userId, name);
    return res.status(201).json({
      id: board.id,
      name: board.name,
      createdAt: board.createdAt,
      ownerId: board.ownerId,
    });
  } catch (e) {
    if (e.message === "INVALID_NAME") {
      return res.status(400).json({ error: "Nombre inválido" });
    }
    console.error(e);
    res.status(500).json({ error: "Error al crear tablero" });
  }
}
