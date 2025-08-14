import { Task, TaskInput } from "../types/task";

let tasks: Task[] = [
  {
    id: "1",
    title: "Set up project structure",
    description: "Initialize Node.js and React projects with TypeScript.",
    completed: true,
    createdAt: new Date("2023-10-26T10:00:00Z"),
    priority: "high",
  },
  {
    id: "2",
    title: "Create backend API",
    description: "Build the Express server with all the necessary endpoints.",
    completed: false,
    createdAt: new Date("2023-10-26T11:00:00Z"),
    priority: "high",
  },
  {
    id: "3",
    title: "Develop frontend UI",
    description: "Build the React components for the task manager.",
    completed: false,
    createdAt: new Date("2023-10-26T12:00:00Z"),
    priority: "medium",
  },
  {
    id: "4",
    title: "Buy groceries",
    description: "Milk, Bread, Cheese, and Fruits.",
    completed: false,
    createdAt: new Date("2023-10-27T09:00:00Z"),
    priority: "low",
  },
];

let nextId: number =
  tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) + 1 : 1;

//get all
export const getAllTasks = (): Task[] => {
  return [...tasks];
};

//find by id
export const getTaskById = (id: string): Task | undefined => {
  return tasks.find((t) => t.id === id);
};

//add task
export const addTask = (taskInput: TaskInput): Task => {
  const newTask: Task = {
    id: (nextId++).toString(),
    title: taskInput.title.trim(),
    description: taskInput.description.trim(),
    completed: false,
    createdAt: new Date(),
    priority: taskInput.priority,
  };
  tasks.push(newTask);
  return newTask;
};

//update task by id
export const updateTask = (
  id: string,
  taskInput: TaskInput,
  completed: boolean
): Task | undefined => {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) {
    return undefined;
  }
  const updatedTask: Task = {
    ...tasks[taskIndex],
    title: taskInput.title.trim(),
    description: taskInput.description.trim(),
    priority: taskInput.priority,
    completed: completed,
  };
  tasks[taskIndex] = updatedTask;
  return updatedTask;
};

//delete task by id
export const deleteTask = (id: string): boolean => {
  const initialLength = tasks.length;
  const newTasks = tasks.filter((t) => t.id !== id);
  if (newTasks.length === initialLength) {
    return false;
  }
  tasks = newTasks;
  return true;
};
