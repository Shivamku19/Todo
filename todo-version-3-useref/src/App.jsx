import { useState } from "react";
import Header from "./component/header";
import Item1 from "./component/item1";
import Todoitems from "./component/todoitems";
import Welcomemess from "./component/welcomemess";
import TaskFilters from "./component/TaskFilters";
import { TodoItemsContextProvider, useTodo } from "./store/todo-items-store";
import { ToastProvider } from "./context/ToastContext";
import "./App.css";

function AppContent() {
  const { todoItems } = useTodo();
  const [filter, setFilter] = useState("all");

  const counts = {
    all: todoItems.length,
    active: todoItems.filter((t) => !t.completed).length,
    completed: todoItems.filter((t) => t.completed).length,
  };

  const filteredItems = todoItems.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  return (
    <div className="todo-container container py-4">
      <Header />
      <Item1 />
      <TaskFilters currentFilter={filter} onFilterChange={setFilter} counts={counts} />
      <Welcomemess todoitems={filteredItems} />
      <Todoitems todoitems={filteredItems} />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <TodoItemsContextProvider>
        <AppContent />
      </TodoItemsContextProvider>
    </ToastProvider>
  );
}

export default App;
