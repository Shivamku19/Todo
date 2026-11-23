# 📝 React Todo App (useRef & Bootstrap)

A responsive and interactive Todo application built with **React 19**, **Vite**, and **Bootstrap 5**. This version demonstrates the use of React's `useRef` hook for handling form inputs efficiently without triggering re-renders on every keystroke.

---

## 🚀 Features

- **Add Tasks:** Enter task name and choose a due date.
- **Uncontrolled Inputs with `useRef`:** Fast form handling using `useRef` references rather than continuous state updates.
- **Delete Tasks:** Remove individual completed tasks with one click.
- **Dynamic Empty State:** Displays a friendly message (*"ENJOY YOUR DAY U R FREE"*) when there are no tasks left.
- **Clean UI & Icons:** Styled using Bootstrap 5 grid and icons from `react-icons` (Remix Icons).

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Bootstrap 5](https://getbootstrap.com/) & Custom CSS / CSS Modules
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (`react-icons/ri`)

---

## 📁 Project Structure

```text
src/
├── assets/
├── component/
│   ├── header.jsx              # App header title
│   ├── item1.jsx               # Task input form (uses useRef)
│   ├── todoitem.jsx            # Individual todo item row with delete button
│   ├── todoitems.jsx           # Container component that maps over tasks
│   ├── welcomemess.jsx         # Empty state welcome message
│   └── welcomemess.module.css  # CSS module for welcome message
├── App.css                     # Main styling
├── App.jsx                     # Root component managing task state
└── main.jsx                    # Vite React root mount
```

---

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

---

## 🧠 Key React Concepts Demonstrated

- **`useRef` Hook:** Used in `item1.jsx` to access input field values directly when adding a task, avoiding re-renders on every keystroke.
- **State Lifting:** Managing `todoitems` state array in `App.jsx` and passing state / action handlers down through props.
- **Conditional Rendering:** Showing `Welcomemess` when `todoitems.length === 0`.
- **Component Decomposition:** Breaking the UI into modular, reusable components.
