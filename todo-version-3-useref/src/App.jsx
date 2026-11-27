import { useState, useEffect } from "react";
import Header from "./component/header";
import Item1 from "./component/item1";
import Todoitems from "./component/todoitems";
import Welcomemess from "./component/welcomemess";
import TaskFilters from "./component/TaskFilters";
import SearchBar from "./component/SearchBar";
import TaskStats from "./component/TaskStats";
import KeyboardShortcutsModal from "./component/KeyboardShortcutsModal";
import { TodoItemsContextProvider, useTodo } from "./store/todo-items-store";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function AppContent() {
  const { todoItems, clearCompleted, toggleAllCompleted } = useTodo();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedTag, setSelectedTag] = useState(null);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      const isInput = activeTag === "input" || activeTag === "textarea" || activeTag === "select";

      if (e.key === "?" && !isInput) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === "/" && !isInput) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]');
        searchInput?.focus();
      } else if ((e.key === "n" || e.key === "N") && !isInput) {
        e.preventDefault();
        const taskInput = document.querySelector("input.todo");
        taskInput?.focus();
      } else if (e.key === "Escape") {
        setIsShortcutsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const allTags = Array.from(
    new Set(todoItems.flatMap((item) => (Array.isArray(item.tags) ? item.tags : [])))
  ).filter(Boolean);

  const counts = {
    all: todoItems.length,
    active: todoItems.filter((t) => !t.completed).length,
    completed: todoItems.filter((t) => t.completed).length,
    starred: todoItems.filter((t) => t.isPinned).length,
  };

  useEffect(() => {
    const pendingCount = counts.active;
    document.title = pendingCount > 0 ? `(${pendingCount}) Tasks - Todo App` : "Todo App";
  }, [counts.active]);

  const filteredItems = todoItems.filter((item) => {
    if (filter === "active" && item.completed) return false;
    if (filter === "completed" && !item.completed) return false;
    if (filter === "starred" && !item.isPinned) return false;
    if (selectedTag && (!Array.isArray(item.tags) || !item.tags.includes(selectedTag))) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = (item.name || "").toLowerCase().includes(q);
      const descMatch = (item.description || "").toLowerCase().includes(q);
      const categoryMatch = (item.category || "").toLowerCase().includes(q);
      const tagsMatch = Array.isArray(item.tags) && item.tags.some((t) => t.toLowerCase().includes(q));
      return nameMatch || descMatch || categoryMatch || tagsMatch;
    }

    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    // Pinned tasks float to top
    if (Boolean(a.isPinned) !== Boolean(b.isPinned)) {
      return a.isPinned ? -1 : 1;
    }
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
      <Header onOpenShortcuts={() => setIsShortcutsOpen(true)} />
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
        allTags={allTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
      />
      <Welcomemess todoitems={sortedItems} />
      <Todoitems todoitems={sortedItems} sortBy={sortBy} />
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
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
