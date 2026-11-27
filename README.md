# 📝 React Todo App (Advanced Architecture)

A responsive, feature-rich Todo and task productivity application built with **React 19**, **Vite**, and **Bootstrap 5**.

---

## 🚀 Features

### Core Productivity & Task Management
- **⚡ Fast Task Creation (`useRef`):** Uncontrolled form inputs leveraging React's `useRef` to eliminate unnecessary re-renders while typing.
- **⭐ Star & Pin to Top:** Star critical tasks to pin them to the top of your list with visual gold accent highlighting.
- **📋 Subtask Checklists:** Break down tasks into subtasks with progress tracking bar, item completion toggles, and inline subtask management.
- **🍅 Integrated Pomodoro Focus Timer:** Built-in Pomodoro timer (25m Focus, 5m Short Break, 15m Long Break) tracking completed focus sessions on each task.
- **📊 Productivity Insights & Analytics:** Dedicated metrics dashboard tracking task completion rates, priority distribution, focus hours, and health alerts.
- **🔄 Quick Task Duplication:** 1-click clone todos with all their subtasks, tags, and metadata preserved.
- **↕️ Manual Task Reordering:** Move tasks up and down with dedicated controls and persistent custom ordering.
- **↩️ Interactive Action Toasts with Instant Undo:** Non-blocking notification toasts with a 5-second undo button for accidental deletions.
- **🔊 Synthesized Web Audio Sound Feedback:** Offline-first sound effects using the browser's Web Audio API for completion chimes and timers, with audio mute toggle.
- **🖨️ Print & PDF Ready Checklist:** Clean print stylesheet hiding all interactive controls for physical checklists or PDF export.

### Organization, Filtering & Customization
- **🌙 Dark / Light Mode:** Fully responsive theme switcher with automatic preference detection and `localStorage` persistence.
- **🏷️ Custom Tags & Tag Filtering:** Tag tasks with topics (`#work`, `#bug`, `#react`) and filter active tasks by clicking tags.
- **📁 Category Filtering & Color Badges:** Assign and filter tasks by category (`Work`, `Personal`, `Shopping`, `Fitness`, `General`) with distinct color themes.
- **🔍 Instant Search & Status Filter:** Real-time search across task titles, notes, tags, and categories; filter by All, Active, Completed, or Starred.
- **📅 Deadline Status Indicators:** Live badges highlighting tasks that are Overdue, Due Today, or Upcoming.
- **🔄 Multi-criteria Sorting:** Sort tasks by Custom/Manual order, due date, priority (Urgent, High, Medium, Low), or alphabetical name.
- **📝 Task Descriptions & Notes:** Add detailed notes or descriptions to tasks with collapsible previews and inline editing.
- **💾 Backup & Restore (Export/Import):** Export tasks to a formatted JSON file and restore or merge backups directly into your browser storage.
- **⚠️ Destructive Action Confirmation:** Reusable confirmation dialogs preventing accidental task deletions and bulk clears.
- **🎉 Celebratory Empty States:** Dynamic contextual feedback displaying congratulations when all tasks are complete, friendly onboarding for new users, and empty search indicators.
- **⌨️ Keyboard Shortcuts:** Navigate with speed using global shortcuts (`N` for new task, `/` for search, `?` for shortcuts guide, `Esc` to close).

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Bootstrap 5](https://getbootstrap.com/) & Scoped CSS Modules
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (`react-icons/ri`)
- **State Management:** React Context API & `useReducer` with LocalStorage Synchronization
- **Audio Feedback:** Synthetic Web Audio API (`AudioContext`)

---

## 📁 Project Structure

```text
todo-version-3-useref/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── component/
│   │   ├── ConfirmModal.jsx            # Reusable confirmation modal for deletions
│   │   ├── DataBackupModal.jsx         # JSON export & import backup manager
│   │   ├── ErrorBoundary.jsx           # React error boundary for runtime errors
│   │   ├── header.jsx                  # Header with title, sound toggle & theme toggle
│   │   ├── item1.jsx                   # Task input form (useRef, priority, tags, notes)
│   │   ├── KeyboardShortcutsModal.jsx  # Keyboard shortcuts cheatsheet guide
│   │   ├── PomodoroModal.jsx           # Integrated Pomodoro focus timer with session tracking
│   │   ├── ProductivityStatsModal.jsx  # Productivity insights and analytics dashboard
│   │   ├── SearchBar.jsx               # Instant search input
│   │   ├── TaskFilters.jsx             # Filter pills, category filters, sorting & toolbar
│   │   ├── TaskStats.jsx               # Completion percentage & task metrics
│   │   ├── todoitem.jsx                # Todo card with subtasks, star, reorder, notes & pomodoro
│   │   ├── todoitems.jsx               # Todo list container
│   │   ├── welcomemess.jsx             # Contextual empty & celebratory states
│   │   └── welcomemess.module.css      # Styling & animations for celebrations
│   ├── context/
│   │   ├── ThemeContext.jsx            # Dark/Light mode provider and hook
│   │   ├── ToastContext.jsx            # Actionable toast notifications provider (with Undo)
│   │   └── Toast.css                   # Toast styling
│   ├── models/
│   │   └── todo.js                     # Standardized task factory & priority constants
│   ├── store/
│   │   ├── todo-action-types.js        # Action type constants
│   │   ├── todo-items-store.jsx        # Context provider & custom hook
│   │   └── todo-reducer.js             # Pure reducer managing task state
│   ├── utils/
│   │   └── soundEffects.js             # Web Audio API synthesized sound generator
│   ├── App.css                         # Application theme, print styles & component styling
│   ├── App.jsx                         # Main layout, filter/sort orchestrator & shortcuts
│   └── main.jsx                        # Vite React mount entry
├── package.json
└── vite.config.js
```

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
cd todo-version-3-useref
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
