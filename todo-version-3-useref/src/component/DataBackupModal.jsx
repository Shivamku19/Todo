import { useState, useRef } from "react";
import { RiDownload2Line, RiUpload2Line, RiCloseLine, RiFileTextLine } from "react-icons/ri";
import { useTodo } from "../store/todo-items-store";
import { useToast } from "../context/ToastContext";

function DataBackupModal({ isOpen, onClose }) {
  const { todoItems, importTodos } = useTodo();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const [replaceExisting, setReplaceExisting] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(todoItems, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const today = new Date().toISOString().split("T")[0];
      const link = document.createElement("a");
      link.href = url;
      link.download = `todo-backup-${today}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      if (showToast) showToast("Tasks exported successfully!", "success");
    } catch (err) {
      console.error("Export error:", err);
      if (showToast) showToast("Failed to export tasks", "danger");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (!Array.isArray(parsed)) {
          throw new Error("Invalid file format. Expected a JSON array of tasks.");
        }
        importTodos(parsed, replaceExisting);
        onClose();
      } catch (err) {
        console.error("Import error:", err);
        if (showToast) showToast(`Import failed: ${err.message}`, "danger");
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title d-flex align-items-center gap-2">
              <RiFileTextLine className="text-primary" />
              Backup & Restore Tasks
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-4">
              <h6 className="fw-semibold">Export Tasks</h6>
              <p className="text-muted small mb-2">
                Download your current tasks ({todoItems.length} items) as a JSON backup file.
              </p>
              <button
                type="button"
                className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
                onClick={handleExport}
                disabled={todoItems.length === 0}
              >
                <RiDownload2Line size={18} />
                <span>Export JSON Backup</span>
              </button>
            </div>

            <hr />

            <div className="mb-2">
              <h6 className="fw-semibold">Import Tasks</h6>
              <p className="text-muted small mb-2">
                Restore or import tasks from a previously saved JSON backup file.
              </p>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="replaceCheck"
                  checked={replaceExisting}
                  onChange={(e) => setReplaceExisting(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="replaceCheck">
                  Replace all existing tasks (uncheck to merge)
                </label>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="btn btn-outline-success d-inline-flex align-items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <RiUpload2Line size={18} />
                <span>Select JSON File</span>
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataBackupModal;
