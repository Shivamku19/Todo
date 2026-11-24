function TaskStats({ total, completed }) {
  if (total === 0) return null;

  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="task-stats-card p-3 my-3 bg-light rounded border shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span className="small fw-semibold text-secondary">Task Progress</span>
        <span className="small fw-bold text-primary">{percentage}% completed</span>
      </div>
      <div className="progress" style={{ height: "8px" }} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
        <div
          className="progress-bar bg-primary"
          style={{ width: `${percentage}%`, transition: "width 0.3s ease" }}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2 small text-muted">
        <span>{completed} of {total} done</span>
        <span>{total - completed} remaining</span>
      </div>
    </div>
  );
}

export default TaskStats;
