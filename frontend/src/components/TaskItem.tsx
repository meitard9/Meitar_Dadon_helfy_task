import type { Priority, Task } from "../types/types";
import "../styles/TaskItem.css";
const priorityColorMap: Record<Priority, string> = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high",
};

const priorityBorderMap: Record<Priority, string> = {
  low: "task-border-low",
  medium: "task-border-medium",
  high: "task-border-high",
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const ViIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        priorityBorderMap[task.priority]
      }`}
    >
      <div className="task-content">
        <div className="task-text">
          <h3 className={`task-title ${task.completed ? "completed" : ""}`}>
            {task.title}
          </h3>
          <p
            className={`task-description ${task.completed ? "completed" : ""}`}
          >
            {task.description}
          </p>
        </div>
        <div className="task-toggle-btn-container">
          <button
            onClick={() => onToggle(task.id)}
            className={`task-toggle-btn completed-${task.completed}`}
          >
            <ViIcon />
          </button>
        </div>
      </div>
      <div className="task-footer">
        <div className="task-meta">
          <span className={`priority-tag ${priorityColorMap[task.priority]}`}>
            {task.priority}
          </span>
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => onDelete(task.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
