import { useState, useEffect } from "react";
import {
  RiPlayFill,
  RiPauseFill,
  RiRestartLine,
  RiCloseLine,
  RiTimerLine,
} from "react-icons/ri";
import { useTodo } from "../store/todo-items-store";
import { useToast } from "../context/ToastContext";

const MODES = {
  WORK: { label: "Work Focus", duration: 25 * 60, color: "primary" },
  SHORT_BREAK: { label: "Short Break", duration: 5 * 60, color: "success" },
  LONG_BREAK: { label: "Long Break", duration: 15 * 60, color: "info" },
};

function PomodoroModal({ isOpen, onClose, task }) {
  const { incrementPomodoro } = useTodo();
  const { showToast } = useToast();

  const [modeKey, setModeKey] = useState("WORK");
  const [timeLeft, setTimeLeft] = useState(MODES.WORK.duration);
  const [isRunning, setIsRunning] = useState(false);

  const activeMode = MODES[modeKey];

  useEffect(() => {
    setTimeLeft(MODES[modeKey].duration);
    setIsRunning(false);
  }, [modeKey, isOpen]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      if (modeKey === "WORK" && task) {
        if (incrementPomodoro) incrementPomodoro(task.id);
        if (showToast) {
          showToast(`🎉 Focus session completed for "${task.name}"! Great work!`, "success", 4000);
        }
      } else {
        if (showToast) {
          showToast(`🔔 Break finished! Ready to focus again?`, "info", 4000);
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, modeKey, task, incrementPomodoro, showToast]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progressPercent = ((activeMode.duration - timeLeft) / activeMode.duration) * 100;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1060 }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0 justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <RiTimerLine size={22} className="text-danger" />
              <h5 className="modal-title fw-bold mb-0">Pomodoro Focus Timer</h5>
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

          <div className="modal-body text-center p-4">
            {task && (
              <div className="mb-3 px-3 py-2 bg-light rounded text-truncate">
                <span className="small text-muted d-block">Current Task</span>
                <span className="fw-semibold text-dark">{task.name}</span>
                {task.pomodoros > 0 && (
                  <span className="badge bg-danger text-white ms-2">
                    🍅 {task.pomodoros} completed
                  </span>
                )}
              </div>
            )}

            {/* Mode Selector */}
            <div className="btn-group btn-group-sm mb-4" role="group">
              <button
                type="button"
                className={`btn ${modeKey === "WORK" ? "btn-danger" : "btn-outline-secondary"}`}
                onClick={() => setModeKey("WORK")}
              >
                Work (25m)
              </button>
              <button
                type="button"
                className={`btn ${modeKey === "SHORT_BREAK" ? "btn-success" : "btn-outline-secondary"}`}
                onClick={() => setModeKey("SHORT_BREAK")}
              >
                Short Break (5m)
              </button>
              <button
                type="button"
                className={`btn ${modeKey === "LONG_BREAK" ? "btn-info text-white" : "btn-outline-secondary"}`}
                onClick={() => setModeKey("LONG_BREAK")}
              >
                Long Break (15m)
              </button>
            </div>

            {/* Big Timer Display */}
            <div className="display-2 fw-bold text-main my-3 font-monospace tracking-wide">
              {formattedTime}
            </div>

            {/* Progress Bar */}
            <div className="progress mb-4" style={{ height: "6px" }}>
              <div
                className={`progress-bar bg-${activeMode.color}`}
                role="progressbar"
                style={{ width: `${progressPercent}%`, transition: "width 1s linear" }}
                aria-valuenow={progressPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>

            {/* Controls */}
            <div className="d-flex justify-content-center align-items-center gap-3">
              <button
                type="button"
                className={`btn btn-lg ${isRunning ? "btn-warning" : "btn-primary"} px-4 d-inline-flex align-items-center gap-2 rounded-pill`}
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? (
                  <>
                    <RiPauseFill size={20} />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <RiPlayFill size={20} />
                    <span>Start Focus</span>
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(activeMode.duration);
                }}
                title="Reset timer"
              >
                <RiRestartLine size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PomodoroModal;
