import { RiDeleteBin5Line } from "react-icons/ri";

function Todoitem({ item, todoname, tododate, ondeleteclk }) {
  const targetIdentifier = (item && item.id) ? item.id : todoname;

  return (
    <div className="container" role="listitem">
      <div className="row kg-row align-items-center">
        <div className="col-6 text-truncate" title={todoname}>
          {todoname}
        </div>
        <div className="col-4 text-muted small">
          {tododate || 'No due date'}
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger btns d-flex align-items-center justify-content-center"
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
