function TaskFilters({ currentFilter, onFilterChange, counts }) {
  const filters = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="task-filters d-flex justify-content-center gap-2 my-3 flex-wrap" role="group" aria-label="Task status filters">
      {filters.map((f) => {
        const isActive = currentFilter === f.key;
        return (
          <button
            key={f.key}
            type="button"
            className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-secondary'} d-inline-flex align-items-center gap-1 shadow-sm`}
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
  );
}

export default TaskFilters;
