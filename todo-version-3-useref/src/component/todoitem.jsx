import { useState } from "react";
import {
  RiDeleteBin5Line,
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
  RiEditLine,
  RiCheckLine,
  RiCloseLine,
  RiCalendarLine,
  RiListCheck2,
  RiAddLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFileTextLine,
  RiStarLine,
  RiStarFill,
  RiFileCopyLine,
  RiTimerLine,
} from "react-icons/ri";
import { useTodo } from "../store/todo-items-store";
import ConfirmModal from "./ConfirmModal";
import PomodoroModal from "./PomodoroModal";

function Todoitem({
  item,
  todoname,
  tododate,
  ondeleteclk,
  ontoggleclk,
  onupdateclk,
  canMoveUp = false,
  canMoveDown = false,
}) {
  const {
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    togglePinItem,
    duplicateItem,
    moveItemUp,
    moveItemDown,
  } = useTodo();
  const targetIdentifier = item && item.id ? item.id : todoname;
  const isCompleted = Boolean(item && item.completed);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todoname);
  const [editedDate, setEditedDate] = useState(tododate);
  const [editedDesc, setEditedDesc] = useState(item?.description || "");
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);

  const subtasks = Array.isArray(item?.subtasks) ? item.subtasks : [];
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const totalSubtasks = subtasks.length;

  const getDueDateStatus = (dueDate, completed) => {
    if (!dueDate) return null;
    if (completed) {
      return { text: dueDate, type: "normal" };
    }
    const today = new Date().toISOString().split("T")[0];
    if (dueDate < today) {
      return { text: `${dueDate} · Overdue`, type: "overdue" };
    }
    if (dueDate === today) {
      return { text: `${dueDate} · Today`, type: "today" };
    }
    return { text: dueDate, type: "normal" };
  };

  const dueStatus = getDueDateStatus(tododate, isCompleted);

  const handleSave = () => {
    const trimmed = editedName.trim();
    if (trimmed && onupdateclk) {
      onupdateclk(targetIdentifier, {
        name: trimmed,
        dueDate: editedDate,
        description: editedDesc.trim(),
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(todoname);
    setEditedDate(tododate);
    setEditedDesc(item?.description || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item-card container my-2 p-2 rounded border-primary" role="listitem">
        <div className="row kg-row align-items-center g-2">
          <div className="col-md-5 col-12">
            <input
              type="text"
              className="form-control form-control-sm"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Task name"
            />
          </div>
          <div className="col-md-4 col-7">
            <input
              type="date"
              className="form-control form-control-sm"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="col-md-3 col-5 text-end d-flex justify-content-end gap-1">
            <button
              type="button"
              className="btn btn-sm btn-success d-inline-flex align-items-center"
              onClick={handleSave}
              title="Save changes (Enter)"
            >
              <RiCheckLine size={16} />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center"
              onClick={handleCancel}
              title="Cancel (Esc)"
            >
              <RiCloseLine size={16} />
            </button>
          </div>
          <div className="col-12 mt-1">
            <input
              type="text"
              className="form-control form-control-sm"
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              placeholder="Task notes / description (optional)"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item-card container my-2 p-2 rounded ${isCompleted ? 'completed-item' : ''} ${item?.isPinned ? 'pinned-item' : ''}`} role="listitem">
      <div className="row kg-row align-items-center">
        <div className="col-1 text-center d-flex align-items-center justify-content-center">
          {(canMoveUp || canMoveDown) && (
            <div className="d-flex flex-column me-1 reorder-btns">
              <button
                type="button"
                className="btn btn-link p-0 text-muted reorder-btn"
                disabled={!canMoveUp}
                onClick={() => moveItemUp && moveItemUp(targetIdentifier)}
                title="Move up"
                aria-label="Move task up"
              >
                <RiArrowUpSLine size={13} />
              </button>
              <button
                type="button"
                className="btn btn-link p-0 text-muted reorder-btn"
                disabled={!canMoveDown}
                onClick={() => moveItemDown && moveItemDown(targetIdentifier)}
                title="Move down"
                aria-label="Move task down"
              >
                <RiArrowDownSLine size={13} />
              </button>
            </div>
          )}
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none toggle-btn"
            onClick={() => ontoggleclk && ontoggleclk(targetIdentifier)}
            aria-label={isCompleted ? "Mark task as incomplete" : "Mark task as complete"}
          >
            {isCompleted ? (
              <RiCheckboxCircleFill size={22} className="text-success" />
            ) : (
              <RiCheckboxBlankCircleLine size={22} className="text-muted" />
            )}
          </button>
        </div>
        <div className="col-5">
          <div className="d-flex align-items-center gap-1">
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none star-btn flex-shrink-0"
              onClick={() => togglePinItem && togglePinItem(targetIdentifier)}
              title={item?.isPinned ? "Unpin task" : "Star / Pin to top"}
              aria-label={item?.isPinned ? "Unpin task" : "Star / Pin to top"}
            >
              {item?.isPinned ? (
                <RiStarFill size={17} className="text-warning" />
              ) : (
                <RiStarLine size={17} className="text-muted star-unpinned" />
              )}
            </button>
            <span className={`text-truncate fw-medium ${isCompleted ? 'text-decoration-line-through text-muted' : ''}`} title={todoname}>
              {todoname}
            </span>
          </div>
          <div className="d-flex align-items-center gap-1 mt-1 flex-wrap">
            {item?.priority && (
              <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>
                {item.priority}
              </span>
            )}
            {item?.category && (
              <span className="category-tag">
                {item.category}
              </span>
            )}
            {item?.pomodoros > 0 && (
              <span className="badge bg-danger text-white small" title={`${item.pomodoros} focus sessions completed`}>
                🍅 {item.pomodoros}
              </span>
            )}
            {Array.isArray(item?.tags) &&
              item.tags.map((tag) => (
                <span key={tag} className="badge bg-light text-secondary border small">
                  #{tag}
                </span>
              ))}
          </div>
        </div>
        <div className="col-3 small">
          {dueStatus ? (
            <span
              className={`due-date-pill ${
                dueStatus.type === "overdue"
                  ? "due-overdue"
                  : dueStatus.type === "today"
                  ? "due-today"
                  : "text-muted"
              }`}
            >
              <RiCalendarLine size={13} className="me-1 align-text-bottom" />
              {dueStatus.text}
            </span>
          ) : (
            <span className="text-muted">No due date</span>
          )}
        </div>
        <div className="col-3 text-end d-flex justify-content-end gap-1">
          <button
            type="button"
            className={`btn btn-sm btns d-inline-flex align-items-center justify-content-center p-1 ${
              showSubtasks ? "btn-primary text-white" : "btn-outline-secondary"
            }`}
            onClick={() => setShowSubtasks(!showSubtasks)}
            aria-label="Toggle subtasks checklist"
            title={totalSubtasks > 0 ? `${completedSubtasks}/${totalSubtasks} subtasks completed` : "Add checklist"}
          >
            <RiListCheck2 size={16} />
            {totalSubtasks > 0 && <span className="ms-1 small">{completedSubtasks}/{totalSubtasks}</span>}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btns d-inline-flex align-items-center justify-content-center p-1"
            onClick={() => setIsPomodoroOpen(true)}
            aria-label={`Start Pomodoro for ${todoname}`}
            title="Start Pomodoro focus session"
          >
            <RiTimerLine size={16} />
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btns d-inline-flex align-items-center justify-content-center p-1"
            onClick={() => duplicateItem && duplicateItem(targetIdentifier)}
            aria-label={`Duplicate ${todoname}`}
            title="Duplicate task"
          >
            <RiFileCopyLine size={16} />
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btns d-inline-flex align-items-center justify-content-center p-1"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${todoname}`}
            title="Edit task"
          >
            <RiEditLine size={16} />
          </button>
          <button
            type="button"
            className="btn btn-danger btns d-inline-flex align-items-center justify-content-center p-1"
            onClick={() => setIsDeleteModalOpen(true)}
            aria-label={`Delete ${todoname}`}
            title="Delete task"
          >
            <RiDeleteBin5Line size={16} />
          </button>
        </div>
      </div>

      {item?.description && (
        <div className="small text-muted mt-2 pt-2 border-top d-flex align-items-start gap-1">
          <RiFileTextLine size={15} className="mt-1 flex-shrink-0 text-primary" />
          <span className="text-break">{item.description}</span>
        </div>
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${todoname}"?`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={() => {
          ondeleteclk(targetIdentifier);
          setIsDeleteModalOpen(false);
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <PomodoroModal
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
        task={item}
      />

      {showSubtasks && (
        <div className="subtasks-container border-top pt-2 mt-2">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small fw-semibold text-secondary">
              Subtasks ({completedSubtasks}/{totalSubtasks})
            </span>
            {totalSubtasks > 0 && (
              <span className="small text-muted">
                {Math.round((completedSubtasks / totalSubtasks) * 100)}%
              </span>
            )}
          </div>
          {totalSubtasks > 0 && (
            <div className="progress mb-2" style={{ height: "4px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
              />
            </div>
          )}
          <div className="subtask-list d-flex flex-column gap-1 mb-2">
            {subtasks.map((sub) => (
              <div
                key={sub.id}
                className="d-flex align-items-center justify-content-between p-1 rounded bg-light"
              >
                <div
                  className="d-flex align-items-center gap-2 flex-grow-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleSubtask && toggleSubtask(item.id, sub.id)}
                >
                  <input
                    type="checkbox"
                    className="form-check-input mt-0"
                    checked={Boolean(sub.completed)}
                    onChange={() => toggleSubtask && toggleSubtask(item.id, sub.id)}
                    aria-label={sub.title}
                  />
                  <span
                    className={`small ${
                      sub.completed ? "text-decoration-line-through text-muted" : ""
                    }`}
                  >
                    {sub.title}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-link text-danger p-0 ms-2"
                  onClick={() => deleteSubtask && deleteSubtask(item.id, sub.id)}
                  title="Delete subtask"
                >
                  <RiCloseLine size={16} />
                </button>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newSubtaskTitle.trim() && addSubtask) {
                addSubtask(item.id, newSubtaskTitle.trim());
                setNewSubtaskTitle("");
              }
            }}
            className="d-flex gap-1"
          >
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Add a subtask..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-sm btn-outline-primary d-inline-flex align-items-center px-2"
              disabled={!newSubtaskTitle.trim()}
            >
              <RiAddLine size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Todoitem;
