import { RiAlertLine } from "react-icons/ri";

function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", zIndex: 1060 }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content border-0 shadow">
          <div className="modal-body text-center p-4">
            <div className="mb-3 text-warning">
              <RiAlertLine size={44} />
            </div>
            <h5 className="modal-title fw-bold mb-2">{title}</h5>
            <p className="text-muted small mb-4">{message}</p>
            <div className="d-flex gap-2 justify-content-center">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary px-3"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn btn-sm btn-${confirmVariant} px-3`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
