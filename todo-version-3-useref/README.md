# 📝 React Todo App (Advanced Architecture)

A responsive, feature-rich Todo and task productivity application built with **React 19**, **Vite**, and **Bootstrap 5**.

---

## 🚀 Features

- **⚡ Fast Task Creation (`useRef`):** Uncontrolled form inputs leveraging React's `useRef` to eliminate unnecessary re-renders while typing.
- **📋 Subtask Checklists:** Break down tasks into subtasks with progress tracking bar, item completion toggles, and inline subtask management.
- **🌙 Dark / Light Mode:** Fully responsive theme switcher with automatic preference detection and `localStorage` persistence.
- **💾 Backup & Restore (Export/Import):** Export tasks to a formatted JSON file and restore or merge backups directly into your browser storage.
- **🏷️ Custom Tags & Tag Filtering:** Tag tasks with topics (`#work`, `#bug`, `#react`) and filter active tasks by clicking tags.
- **📝 Task Descriptions & Notes:** Add detailed notes or descriptions to tasks with collapsible previews and inline editing.
- **⚠️ Destructive Action Confirmation:** Reusable confirmation dialogs preventing accidental task deletions and bulk clears.
- **⌨️ Keyboard Shortcuts:** Navigate with speed using global shortcuts (`N` for new task, `/` for search, `?` for shortcuts guide, `Esc` to close).
- **🎉 Celebratory Empty States:** Dynamic contextual feedback displaying congratulations when all tasks are complete, friendly onboarding for new users, and empty search indicators.
- **📅 Deadline Status Indicators:** Live badges highlighting tasks that are Overdue, Due Today, or Upcoming.
- **🔍 Search & Filter:** Filter tasks by status (All, Active, Completed), custom tags, and search text across title, tags, and descriptions.
- **🔄 Multi-criteria Sorting:** Sort tasks by due date, priority (Urgent, High, Medium, Low), or alphabetical title.
- **🔔 Toast Feedback & Error Boundary:** Non-blocking action toasts and a resilient React Error Boundary preventing UI crashes.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Bootstrap 5](https://getbootstrap.com/) & Scoped CSS Modules
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (`react-icons/ri`)
- **State Management:** React Context API & `useReducer` with LocalStorage Synchronization

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Action |
| :--- | :--- |
| <kbd>N</kbd> | Focus task title input |
| <kbd>/</kbd> | Focus search bar |
| <kbd>?</kbd> | Toggle keyboard shortcuts modal |
| <kbd>Esc</kbd> | Close dialogs / Clear focus |
| <kbd>Enter</kbd> | Save inline task edit or add task |

---

## 💻 Getting Started

### Prerequisites

Node.js v18 or higher is recommended.

### 1. Installation

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 3. Production Build

```bash
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
