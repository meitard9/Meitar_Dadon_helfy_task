import type { Task } from "../types/types";

interface TaskItemProps {
  task: Task;
}
export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div>
      TaskItem:
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.priority}</div>
      <div>{task.completed ? "Completed" : "Not Completed"}</div>
      <div>Created At: {new Date(task.createdAt).toLocaleDateString()}</div>
      <div>Task ID: {task.id}</div>
    </div>
  );
};
