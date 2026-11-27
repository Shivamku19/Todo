import { useState } from "react";
import { RiDatabase2Line, RiBarChartBoxLine, RiPrinterLine } from "react-icons/ri";
import DataBackupModal from "./DataBackupModal";
import ConfirmModal from "./ConfirmModal";
import ProductivityStatsModal from "./ProductivityStatsModal";
import { useTodo } from "../store/todo-items-store";

function TaskFilters({
  currentFilter,
  onFilterChange,
  counts,
  onClearCompleted,
  onToggleAll,
  sortBy,
  onSortChange,
  allTags = [],
  selectedTag = null,
  onSelectTag = () => {},
}) {
  const { todoItems } = useTodo();
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const filters = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed },
    { key: 'starred', label: 'Starred', count: counts.starred || 0 },
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
            <option value="manual">Sort: Custom Order</option>
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
              onClick={() => setIsClearModalOpen(true)}
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
          <button
            type="button"
            className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
            onClick={() => setIsStatsOpen(true)}
            title="Productivity Insights & Analytics"
          >
            <RiBarChartBoxLine size={15} />
            <span>Insights</span>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1"
            onClick={() => window.print()}
            title="Print or Export checklist to PDF"
          >
            <RiPrinterLine size={15} />
            <span>Print</span>
          </button>
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="d-flex align-items-center gap-1 flex-wrap mt-2 pt-2 border-top">
          <span className="small text-muted me-1">Filter by tag:</span>
          {allTags.map((tag) => {
            const isTagActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                className={`btn btn-sm py-0 px-2 rounded-pill small ${
                  isTagActive ? "btn-secondary text-white" : "btn-outline-secondary"
                }`}
                onClick={() => onSelectTag(isTagActive ? null : tag)}
              >
                #{tag}
              </button>
            );
          })}
          {selectedTag && (
            <button
              type="button"
              className="btn btn-sm btn-link text-decoration-none py-0 px-1 text-danger small"
              onClick={() => onSelectTag(null)}
            >
              Clear tag filter
            </button>
          )}
        </div>
      )}

      <DataBackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
      />
      <ProductivityStatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        todoItems={todoItems}
      />
      <ConfirmModal
        isOpen={isClearModalOpen}
        title="Clear Completed Tasks"
        message={`Are you sure you want to remove all ${counts.completed} completed tasks?`}
        confirmText="Clear Completed"
        confirmVariant="danger"
        onConfirm={() => {
          onClearCompleted();
          setIsClearModalOpen(false);
        }}
        onCancel={() => setIsClearModalOpen(false)}
      />
    </div>
  );
}

export default TaskFilters;
