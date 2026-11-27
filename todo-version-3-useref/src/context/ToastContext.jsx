import { createContext, useContext, useState, useCallback } from 'react';
import './Toast.css';

const ToastContext = createContext({
  showToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000, action = null) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type, action }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className="toast-container-custom">
        {toasts.map((toast) => (
          <div key={toast.id} className={`custom-toast custom-toast-${toast.type}`}>
            <span className="flex-grow-1">{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                className="toast-action-btn"
                onClick={() => {
                  if (typeof toast.action.onClick === 'function') {
                    toast.action.onClick();
                  }
                  removeToast(toast.id);
                }}
              >
                {toast.action.label || 'Undo'}
              </button>
            )}
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
