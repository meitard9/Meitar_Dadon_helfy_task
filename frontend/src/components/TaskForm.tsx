import { useState, type FormEvent } from "react";
import type { Priority, Task } from "../types/types";
import "../styles/TaskForm.css";

interface TaskFormProps {
    onSubmit: (taskData: Omit<Task, "id" | "createdAt" | "completed">) => void;
    initialData?: Omit<Task, "id" | "createdAt" | "completed">;
    buttonText: string;
    onCancel?: () => void;
  }
  
  export const TaskForm: React.FC<TaskFormProps> = ({
    onSubmit,
    initialData,
    buttonText,
    onCancel,
  }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(
      initialData?.description || ""
    );
    const [priority, setPriority] = useState<Priority>(
      initialData?.priority || "medium"
    );
    const [error, setError] = useState<string | null>(null);
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      // Frontend Validation
      if (title.trim().length < 3) {
        setError("Title must be at least 3 characters long.");
        return;
      }
      if (description.trim().length === 0) {
        setError("Description is required.");
        return;
      }
      setError(null);
      onSubmit({ title, description, priority });
      if (!initialData) {
        setTitle("");
        setDescription("");
        setPriority("medium");
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="task-form">
        {error && (
          <div className="error-message">{error}</div>
        )}
        <div className="form-group">
          <label
            htmlFor="title"
            className="form-label"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="description"
            className="form-label"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="priority"
            className="form-label"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="form-select"
          >
            {/** TODO: add Enum for priorities or something */}
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="form-button form-cancel-btn"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="form-button form-submit-btn"
          >
            {buttonText}
          </button>
        </div>
      </form>
    );
  };