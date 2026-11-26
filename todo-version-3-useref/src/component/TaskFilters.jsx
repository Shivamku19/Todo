import { useState } from "react";
import { RiDatabase2Line } from "react-icons/ri";
import DataBackupModal from "./DataBackupModal";

function TaskFilters({ currentFilter, onFilterChange, counts, onClearCompleted, onToggleAll, sortBy, onSortChange }) {
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  const filters = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed },
  ];

  const allCompleted = counts.all > 0 && counts.all === counts.completed;

  return (
    <div className="task-filters-section my-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="d-flex gap-1" role="group" aria-label="Task status filters">
          {filters.map((f) => {
            const isActive = currentFilter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-secondary'} d-inline-flex align-items-center gap-1`}
                onClick={() => onFilterChange(f.key)}
              >
                <span>{f.label}</span>
                <span className={`badge ${isActive ? 'bg-white text-primary' : 'bg-secondary text-white'} rounded-pill`}>
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <select
            className="form-select form-select-sm"
            style={{ width: "auto" }}
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            title="Sort tasks"
          >
            <option value="default">Sort: Default</option>
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="name">Sort: Name (A-Z)</option>
          </select>
          {counts.all > 0 && (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={onToggleAll}
              title="Toggle all tasks status"
            >
              {allCompleted ? 'Unmark all' : 'Mark all done'}
            </button>
          )}
          {counts.completed > 0 && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={onClearCompleted}
              title="Clear all completed tasks"
            >
              Clear completed
            </button>
          )}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1"
            onClick={() => setIsBackupOpen(true)}
            title="Backup & Restore tasks (JSON)"
          >
            <RiDatabase2Line size={15} />
            <span>Backup</span>
          </button>
        </div>
      </div>
      <DataBackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
      />
    </div>
  );
}

export default TaskFilters;
