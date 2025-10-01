import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getBoards, postBoard } from "../controllers/boardController.js";

const router = Router();

router.get("/boards", requireAuth, getBoards);
router.post("/boards", requireAuth, postBoard);

export default router;
