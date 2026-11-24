import { useState } from "react";
import {
  RiDeleteBin5Line,
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
  RiEditLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

function Todoitem({ item, todoname, tododate, ondeleteclk, ontoggleclk, onupdateclk }) {
  const targetIdentifier = item && item.id ? item.id : todoname;
  const isCompleted = Boolean(item && item.completed);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todoname);
  const [editedDate, setEditedDate] = useState(tododate);

  const handleSave = () => {
    const trimmed = editedName.trim();
    if (trimmed && onupdateclk) {
      onupdateclk(targetIdentifier, {
        name: trimmed,
        dueDate: editedDate,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(todoname);
    setEditedDate(tododate);
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
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item-card container my-2 p-2 rounded ${isCompleted ? 'completed-item' : ''}`} role="listitem">
      <div className="row kg-row align-items-center">
        <div className="col-1 text-center">
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
          <div className={`text-truncate fw-medium ${isCompleted ? 'text-decoration-line-through text-muted' : ''}`} title={todoname}>
            {todoname}
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
          </div>
        </div>
        <div className="col-3 text-muted small">
          {tododate || 'No due date'}
        </div>
        <div className="col-3 text-end d-flex justify-content-end gap-1">
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
            onClick={() => ondeleteclk(targetIdentifier)}
            aria-label={`Delete ${todoname}`}
            title="Delete task"
          >
            <RiDeleteBin5Line size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todoitem;
