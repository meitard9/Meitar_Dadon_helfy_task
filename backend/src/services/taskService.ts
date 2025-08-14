import { Task, TaskInput } from "../types/task";
import * as tasksDb from "../db/mockDB";

//get sorted tasks by date
export const getSortedTasks = (): Task[] => {
  const tasks = tasksDb.getAllTasks();
  return [...tasks].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
};

//create task
export const createTask = (taskInput: TaskInput): Task => {
  return tasksDb.addTask(taskInput);
};

//update task
export const updateExistingTask = (
  id: string,
  taskInput: TaskInput,
  completed: boolean
): Task | null => {
  const updatedTask = tasksDb.updateTask(id, taskInput, completed);
  return updatedTask || null;
};

//delete task
export const deleteExistingTask = (id: string): boolean => {
  return tasksDb.deleteTask(id);
};

//toggle task completion
export const toggleTaskCompletion = (id: string): Task | null => {
  const task = tasksDb.getTaskById(id);
  if (!task) {
    return null;
  }
  const updatedTask = tasksDb.updateTask(
    id,
    {
      title: task.title,
      description: task.description,
      priority: task.priority,
    },
    !task.completed
  );
  return updatedTask || null;
};