import { RiDeleteBin5Line, RiCheckboxCircleFill, RiCheckboxBlankCircleLine } from "react-icons/ri";

function Todoitem({ item, todoname, tododate, ondeleteclk, ontoggleclk }) {
  const targetIdentifier = (item && item.id) ? item.id : todoname;
  const isCompleted = Boolean(item && item.completed);

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
        <div className="col-4 text-muted small">
          {tododate || 'No due date'}
        </div>
        <div className="col-2 text-end">
          <button
            type="button"
            className="btn btn-danger btns d-inline-flex align-items-center justify-content-center"
            onClick={() => ondeleteclk(targetIdentifier)}
            aria-label={`Delete ${todoname}`}
          >
            <RiDeleteBin5Line size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todoitem;
