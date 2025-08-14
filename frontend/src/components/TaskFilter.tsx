import type { FilterState, Priority } from "../types/types";
import "../styles/TaskFilters.css";
import type { ReactNode } from "react";

type SetFilterFunc = (filter: FilterState) => void;
interface Status {
  status: "all" | "active" | "completed";
}
interface TaskFilterProps {
  filter: FilterState;
  setFilter: SetFilterFunc;
}
interface StatusOptionButtonProps extends TaskFilterProps, Status {
  children: ReactNode;
}

const StatusOptionButton: React.FC<StatusOptionButtonProps> = ({
  filter,
  setFilter,
  status,
  children,
}) => {
  return (
    <div>
      <button
        onClick={() => setFilter({ ...filter, status })}
        className={`status-btn ${
          filter.status === status ? "active" : "inactive"
        }`}
      >
        {children}
      </button>
    </div>
  );
};

export const TaskFilter: React.FC<TaskFilterProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className="filters-container">
      <div className="status-filters">
        <StatusOptionButton filter={filter} setFilter={setFilter} status="all">
          All
        </StatusOptionButton>
        <StatusOptionButton
          filter={filter}
          setFilter={setFilter}
          status="active"
        >
          Active
        </StatusOptionButton>
        <StatusOptionButton
          filter={filter}
          setFilter={setFilter}
          status="completed"
        >
          Completed
        </StatusOptionButton>
      </div>
      <div>
        <label htmlFor="priority-filter" className="sr-only">
          Filter by Priority
        </label>
        <select
          id="priority-filter"
          value={filter.priority}
          onChange={(e) =>
            setFilter({
              ...filter,
              priority: e.target.value as "all" | Priority,
            })
          }
          className="priority-filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};
