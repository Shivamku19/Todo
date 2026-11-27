import {
  RiCloseLine,
  RiBarChartBoxLine,
  RiCheckDoubleLine,
  RiTimeLine,
  RiAlarmWarningLine,
  RiStarFill,
} from "react-icons/ri";

function ProductivityStatsModal({ isOpen, onClose, todoItems = [] }) {
  if (!isOpen) return null;

  const total = todoItems.length;
  const completed = todoItems.filter((t) => t.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Pomodoro stats
  const totalPomodoros = todoItems.reduce((acc, t) => acc + (Number(t.pomodoros) || 0), 0);
  const totalFocusMinutes = totalPomodoros * 25;
  const focusHours = (totalFocusMinutes / 60).toFixed(1);

  // Subtask metrics
  const allSubtasks = todoItems.flatMap((t) => (Array.isArray(t.subtasks) ? t.subtasks : []));
  const completedSubtasks = allSubtasks.filter((s) => s.completed).length;
  const subtaskRate = allSubtasks.length > 0 ? Math.round((completedSubtasks / allSubtasks.length) * 100) : 0;

  // Priority counts
  const priorities = {
    urgent: todoItems.filter((t) => t.priority?.toLowerCase() === "urgent").length,
    high: todoItems.filter((t) => t.priority?.toLowerCase() === "high").length,
    medium: todoItems.filter((t) => t.priority?.toLowerCase() === "medium").length,
    low: todoItems.filter((t) => t.priority?.toLowerCase() === "low").length,
  };

  // Due Date status
  const today = new Date().toISOString().split("T")[0];
  const overdueCount = todoItems.filter((t) => !t.completed && t.dueDate && t.dueDate < today).length;
  const dueTodayCount = todoItems.filter((t) => !t.completed && t.dueDate === today).length;
  const pinnedCount = todoItems.filter((t) => t.isPinned).length;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1060 }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0 justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <RiBarChartBoxLine size={24} className="text-primary" />
              <h5 className="modal-title fw-bold mb-0">Productivity Insights & Analytics</h5>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-link text-muted p-0"
              onClick={onClose}
              aria-label="Close"
            >
              <RiCloseLine size={24} />
            </button>
          </div>

          <div className="modal-body p-4">
            {/* Top Stat Cards */}
            <div className="row g-3 mb-4">
              <div className="col-md-3 col-6">
                <div className="p-3 rounded bg-light border text-center h-100">
                  <div className="text-muted small">Completion Rate</div>
                  <div className="fs-3 fw-bold text-success my-1">{completionRate}%</div>
                  <div className="small text-muted">{completed}/{total} tasks done</div>
                </div>
              </div>

              <div className="col-md-3 col-6">
                <div className="p-3 rounded bg-light border text-center h-100">
                  <div className="text-muted small">Focus Time</div>
                  <div className="fs-3 fw-bold text-danger my-1">🍅 {totalPomodoros}</div>
                  <div className="small text-muted">~{focusHours} hrs ({totalFocusMinutes}m)</div>
                </div>
              </div>

              <div className="col-md-3 col-6">
                <div className="p-3 rounded bg-light border text-center h-100">
                  <div className="text-muted small">Subtasks Progress</div>
                  <div className="fs-3 fw-bold text-primary my-1">{subtaskRate}%</div>
                  <div className="small text-muted">{completedSubtasks}/{allSubtasks.length} items</div>
                </div>
              </div>

              <div className="col-md-3 col-6">
                <div className="p-3 rounded bg-light border text-center h-100">
                  <div className="text-muted small">Starred / Pinned</div>
                  <div className="fs-3 fw-bold text-warning my-1">⭐ {pinnedCount}</div>
                  <div className="small text-muted">High priority focus</div>
                </div>
              </div>
            </div>

            {/* Task Health Alert Summary */}
            {(overdueCount > 0 || dueTodayCount > 0) && (
              <div className="alert alert-warning d-flex align-items-center gap-2 mb-4 py-2">
                <RiAlarmWarningLine size={20} className="flex-shrink-0 text-warning" />
                <span className="small">
                  <strong>Attention needed:</strong> You have {overdueCount > 0 && <span className="text-danger fw-bold">{overdueCount} overdue</span>}
                  {overdueCount > 0 && dueTodayCount > 0 && " and "}
                  {dueTodayCount > 0 && <span className="text-dark fw-bold">{dueTodayCount} due today</span>}.
                </span>
              </div>
            )}

            {/* Priority Distribution */}
            <div className="card border-0 bg-light p-3 mb-3">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <RiCheckDoubleLine size={18} className="text-primary" />
                Tasks by Priority
              </h6>
              <div className="d-flex flex-column gap-2">
                <div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span className="text-danger fw-semibold">Urgent</span>
                    <span>{priorities.urgent} tasks</span>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: `${total > 0 ? (priorities.urgent / total) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span className="text-warning fw-semibold">High</span>
                    <span>{priorities.high} tasks</span>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: `${total > 0 ? (priorities.high / total) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span className="text-primary fw-semibold">Medium</span>
                    <span>{priorities.medium} tasks</span>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: `${total > 0 ? (priorities.medium / total) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span className="text-secondary fw-semibold">Low</span>
                    <span>{priorities.low} tasks</span>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-secondary"
                      style={{ width: `${total > 0 ? (priorities.low / total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button type="button" className="btn btn-sm btn-secondary px-4" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductivityStatsModal;
