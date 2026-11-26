import { useState, useEffect } from "react";
import Header from "./component/header";
import Item1 from "./component/item1";
import Todoitems from "./component/todoitems";
import Welcomemess from "./component/welcomemess";
import TaskFilters from "./component/TaskFilters";
import SearchBar from "./component/SearchBar";
import TaskStats from "./component/TaskStats";
import { TodoItemsContextProvider, useTodo } from "./store/todo-items-store";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function AppContent() {
  const { todoItems, clearCompleted, toggleAllCompleted } = useTodo();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const counts = {
    all: todoItems.length,
    active: todoItems.filter((t) => !t.completed).length,
    completed: todoItems.filter((t) => t.completed).length,
  };

  useEffect(() => {
    const pendingCount = counts.active;
    document.title = pendingCount > 0 ? `(${pendingCount}) Tasks - Todo App` : "Todo App";
  }, [counts.active]);

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

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === "priority") {
      const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
      const weightA = priorityWeight[a.priority?.toLowerCase()] || 0;
      const weightB = priorityWeight[b.priority?.toLowerCase()] || 0;
      return weightB - weightA;
    }
    if (sortBy === "name") {
      return (a.name || "").localeCompare(b.name || "");
    }
    return 0;
  });

  return (
    <div className="todo-container container py-4">
      <Header />
      <Item1 />
      <TaskStats total={counts.all} completed={counts.completed} />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <TaskFilters
        currentFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
        onClearCompleted={clearCompleted}
        onToggleAll={toggleAllCompleted}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <Welcomemess todoitems={sortedItems} />
      <Todoitems todoitems={sortedItems} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <TodoItemsContextProvider>
          <AppContent />
        </TodoItemsContextProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
