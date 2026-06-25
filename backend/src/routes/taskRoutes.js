import express from "express";
import {
  getAllTasks,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get   ("/",           getAllTasks);
router.post  ("/",           createTask);
router.patch ("/:id/status", updateTaskStatus);
router.put   ("/:id",        updateTask);
router.delete("/:id",        deleteTask);

export default router;