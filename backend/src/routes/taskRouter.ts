import express, { Request, Response, Router } from "express";
import { validateTaskDataMiddleware } from "../middleware/validation";
import * as tasksService from "../services/taskService";

//Base route here is /api/tasks
const router: Router = express.Router();

// GET - Get all tasks
router.get("/", (req: Request, res: Response) => {
  const tasks = tasksService.getSortedTasks();
  res.status(200).json(tasks);
});

// POST - Create a new task
router.post("/", validateTaskDataMiddleware, (req: Request, res: Response) => {
  const newTask = tasksService.createTask(req.body);
  res.status(201).json(newTask);
});

// PUT /:id - Update a task
router.put(
  "/:id",
  validateTaskDataMiddleware,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, priority, completed } = req.body;

    const updatedTask = tasksService.updateExistingTask(
      id,
      { title, description, priority },
      completed
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  }
);

// DELETE /:id - Delete a task
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const wasDeleted = tasksService.deleteExistingTask(id);

  if (!wasDeleted) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(204).send(); // No Content
});

// PATCH /:id/toggle - Toggle task completion status
router.patch("/:id/toggle", (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTask = tasksService.toggleTaskCompletion(id);

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(updatedTask);
});

export default router;
