import type { Task } from "../types/types";
import { TaskItem } from "./TaskItem";
import "../styles/TaskList.css";

interface TaskListProps {
    tasks: Task[];
    loading: boolean;
    apiError: string | null;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
  }
  
  export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    loading,
    apiError,
    onToggle,
    onDelete,
    onEdit,
  }) => {
    if (loading) {
      return <div className="loading-message">Loading tasks...</div>;
    }
  
    if (apiError) {
      return (
        <div
          className="error-alert"
          role="alert"
        >
          <p className="error-title">Error</p>
          <p>{apiError}</p>
        </div>
      );
    }
  
    if (tasks.length === 0) {
      return (
        <div className="empty-state">
          <h3 className="empty-state-title">
            No tasks found
          </h3>
          <p className="empty-state-text">
            change filters or adding a new task.
          </p>
        </div>
      );
    }
  
    return (
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    );
  };
