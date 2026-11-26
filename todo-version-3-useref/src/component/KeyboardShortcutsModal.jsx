import { RiKeyboardLine, RiCloseLine } from "react-icons/ri";

function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "N", description: "Focus new task input field" },
    { key: "/", description: "Focus search bar" },
    { key: "?", description: "Open keyboard shortcuts guide" },
    { key: "Esc", description: "Close dialogs and clear focus" },
    { key: "Enter", description: "Save inline task edit or add task" },
  ];

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", zIndex: 1070 }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title d-flex align-items-center gap-2">
              <RiKeyboardLine className="text-primary" />
              Keyboard Shortcuts
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body p-0">
            <ul className="list-group list-group-flush">
              {shortcuts.map((s) => (
                <li
                  key={s.key}
                  className="list-group-item d-flex justify-content-between align-items-center px-4 py-3"
                >
                  <span className="text-secondary">{s.description}</span>
                  <kbd className="bg-light text-dark border px-2 py-1 rounded shadow-sm fw-bold">
                    {s.key}
                  </kbd>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={onClose}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcutsModal;
