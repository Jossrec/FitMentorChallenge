import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const router = Router();

// tareas de un board
router.get("/boards/:boardId/tasks", requireAuth, getTasks);
router.post("/boards/:boardId/tasks", requireAuth, createTask);

// editar/eliminar tarea por id
router.patch("/tasks/:id", requireAuth, updateTask);
router.delete("/tasks/:id", requireAuth, deleteTask);

export default router;