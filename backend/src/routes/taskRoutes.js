import express from "express";
import { createTask, getTasks, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);

export default router;
