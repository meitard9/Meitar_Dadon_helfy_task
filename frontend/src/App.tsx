import { useCallback, useEffect, useState } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";
import type { FilterState, Task } from "./types/types";
import { TaskList } from "./components/TaskList";
import { Modal } from "./components/Modal";
import { TaskForm } from "./components/TaskForm";
import { ConfirmationDialog } from "./components/ConfirmationDialog";
import { TaskFilter } from "./components/TaskFilter";

//TODO: if have time then use .env file
const API_BASE_URL = "http://localhost:4000/api";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    status: "all",
    priority: "all",
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setApiError(null);
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok)
        throw new Error(
          "Failed to fetch tasks. Please ensure the server is running."
        );
      const data: any[] = await response.json();
      // Parse the 'createdAt' string into a Date object
      const parsedTasks: Task[] = data.map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
      setTasks(parsedTasks);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "default error"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleApiCall = async (
    apiCall: () => Promise<Response>,
    successCallback?: () => void
  ) => {
    try {
      setApiError(null);
      const response = await apiCall();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "api error");
      }
      fetchTasks();
      successCallback?.();
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "default error"
      );
    }
  };

  const handleAddTask = (
    taskData: Omit<Task, "id" | "createdAt" | "completed">
  ) => {
    handleApiCall(() =>
      fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
    );
  };

  const handleUpdateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!taskToEdit) return;
    handleApiCall(
      () =>
        fetch(`${API_BASE_URL}/tasks/${taskToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        }),
      closeEditModal
    );
  };

  const handleToggleTask = (id: string) => {
    handleApiCall(() =>
      fetch(`${API_BASE_URL}/tasks/${id}/toggle`, { method: "PATCH" })
    );
  };

  const handleDeleteTask = () => {
    if (taskToDelete === null) return;
    handleApiCall(
      () =>
        fetch(`${API_BASE_URL}/tasks/${taskToDelete}`, { method: "DELETE" }),
      closeDeleteConfirm
    );
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setTaskToEdit(null);
    setEditModalOpen(false);
  };

  const openDeleteConfirm = (id: string) => {
    setTaskToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setTaskToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =//TODO: add Enum for status
      filter.status === "all" ||
      (filter.status === "completed" && task.completed) ||
      (filter.status === "active" && !task.completed);

    const priorityMatch =
      filter.priority === "all" || task.priority === filter.priority;

    return statusMatch && priorityMatch;
  });

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1>Task Manager</h1>
        </div>
      </header>
      <main className="main-content">
        <div className="main-grid">
          <div className="sidebar-column">
            <div className="task-form-container">
              <h2>Add New Task</h2>
              <TaskForm onSubmit={handleAddTask} buttonText="Add Task" />
            </div>
          </div>
          <div className="main-column">
            <TaskFilter filter={filter} setFilter={setFilter} />
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              apiError={apiError}
              onToggle={handleToggleTask}
              onDelete={openDeleteConfirm}
              onEdit={openEditModal}
            />
          </div>
        </div>
      </main>
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Task"
      >
        {taskToEdit && (
          <TaskForm
            onSubmit={(data) =>
              handleUpdateTask({ ...data, completed: taskToEdit.completed })
            }
            initialData={{
              title: taskToEdit.title,
              description: taskToEdit.description,
              priority: taskToEdit.priority,
            }}
            buttonText="Save Changes"
            onCancel={closeEditModal}
          />
        )}
      </Modal>
      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={handleDeleteTask}
        title="Confirm Deletion"
        message="sure you want to delete task?"
      />
    </div>
  );
};

export default App;