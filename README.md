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
todo-version-3-useref/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── component/
│   │   ├── header.jsx              # App header title
│   │   ├── item1.jsx               # Task input form (uses useRef)
│   │   ├── todoitem.jsx            # Individual todo item row with delete button
│   │   ├── todoitems.jsx           # Container component that maps over tasks
│   │   ├── welcomemess.jsx         # Empty state welcome message
│   │   └── welcomemess.module.css  # CSS module for welcome message
│   ├── App.css                     # Main styling
│   ├── App.jsx                     # Root component managing task state
│   └── main.jsx                    # Vite React root mount
├── package.json
└── vite.config.js
```

---

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Clone or Open the Repository

```bash
git clone https://github.com/your-username/todo-app.git
cd Todo/todo-version-3-useref
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to the local URL shown in your terminal (usually `http://localhost:5173`).

### 4. Build for Production

```bash
npm run build
```

---

## 🧠 Key React Concepts Demonstrated

- **`useRef` vs `useState`:** Using `useRef` in `item1.jsx` to read input values directly from the DOM on button click, avoiding unnecessary component re-renders while typing.
- **State Lifting:** Managing the `todoitems` state array at the top level in `App.jsx` and passing handlers down as props.
- **Conditional Rendering:** Showing `Welcomemess` conditionally based on `todoitems.length === 0`.
- **CSS Modules:** Scoped styling for specific components.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
