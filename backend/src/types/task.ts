export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
}
export interface TaskInput {
  title: string;
  description: string;
  priority: Priority;
}
