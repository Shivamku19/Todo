import { useState } from "react";
import Header from "./component/header";
import Item1 from "./component/item1";
import Todoitems from "./component/todoitems";
import Welcomemess from "./component/welcomemess";
import TaskFilters from "./component/TaskFilters";
import SearchBar from "./component/SearchBar";
import TaskStats from "./component/TaskStats";
import { TodoItemsContextProvider, useTodo } from "./store/todo-items-store";
import { ToastProvider } from "./context/ToastContext";
import "./App.css";

function AppContent() {
  const { todoItems } = useTodo();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const counts = {
    all: todoItems.length,
    active: todoItems.filter((t) => !t.completed).length,
    completed: todoItems.filter((t) => t.completed).length,
  };

  const filteredItems = todoItems.filter((item) => {
    if (filter === "active" && item.completed) return false;
    if (filter === "completed" && !item.completed) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = (item.name || "").toLowerCase().includes(q);
      const categoryMatch = (item.category || "").toLowerCase().includes(q);
      const tagsMatch = Array.isArray(item.tags) && item.tags.some((t) => t.toLowerCase().includes(q));
      return nameMatch || categoryMatch || tagsMatch;
    }

    return true;
  });

  return (
    <div className="todo-container container py-4">
      <Header />
      <Item1 />
      <TaskStats total={counts.all} completed={counts.completed} />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
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
