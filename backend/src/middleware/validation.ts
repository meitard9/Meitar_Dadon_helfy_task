import { NextFunction, Response,Request } from "express";
import { TaskInput } from "../types/task";

export const validateTaskDataMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const body = req.body;
    
    if (!body || typeof body !== "object") {
      res.status(400).json({ message: "Invalid request body." });
      return;
    }
  
    const { title, description, priority } = body as TaskInput;
  
    if (typeof title !== "string" || title.trim().length < 3) {
      res.status(400).json({
        message: "Title is required and must be at least 3 characters long.",
      });
      return;
    }
    if (typeof description !== "string" || description.trim().length === 0) {
      res.status(400).json({ message: "Description is required." });
      return;
    }
    if (!["low", "medium", "high"].includes(priority)) {
      res
        .status(400)
        .json({ message: "Priority must be one of 'low', 'medium', or 'high'." });
      return;
    }
  
    next();
  };