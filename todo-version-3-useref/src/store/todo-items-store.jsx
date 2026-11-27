import { createContext, useContext, useReducer, useEffect } from 'react';
import { todoReducer } from './todo-reducer';
import { TODO_ACTIONS } from './todo-action-types';
import { createTodoItem, PRIORITY_LEVELS } from '../models/todo';
import { useToast } from '../context/ToastContext';

export const TodoItemsContext = createContext({
  todoItems: [],
  addNewItem: () => {},
  deleteItem: () => {},
  restoreItem: () => {},
  moveItemUp: () => {},
  moveItemDown: () => {},
  toggleItem: () => {},
  togglePinItem: () => {},
  duplicateItem: () => {},
  updateItem: () => {},
  clearAll: () => {},
  clearCompleted: () => {},
  toggleAllCompleted: () => {},
  addSubtask: () => {},
  toggleSubtask: () => {},
  deleteSubtask: () => {},
  importTodos: () => {},
});

const STORAGE_KEY = 'todo_items_storage_v1';

const INITIAL_TODOS = [
  createTodoItem({
    name: 'Review project backlog and prioritize tasks',
    dueDate: new Date().toISOString().split('T')[0],
    priority: PRIORITY_LEVELS.HIGH,
    category: 'Work',
    tags: ['React', 'Architecture'],
  }),
  createTodoItem({
    name: 'Buy organic milk and groceries',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    priority: PRIORITY_LEVELS.LOW,
    category: 'Personal',
    tags: ['Shopping'],
  }),
];

const getInitialTodos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load tasks from localStorage:', err);
  }
  return INITIAL_TODOS;
};

export const TodoItemsContextProvider = ({ children }) => {
  const [todoItems, dispatch] = useReducer(todoReducer, undefined, getInitialTodos);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
    } catch (err) {
      console.error('Failed to persist tasks to localStorage:', err);
    }
  }, [todoItems]);

  const addNewItem = (itemData) => {
    dispatch({
      type: TODO_ACTIONS.ADD_ITEM,
      payload: itemData,
    });
    if (showToast) {
      showToast(`Task "${itemData.name}" added successfully!`, 'success');
    }
  };

  const restoreItem = (item, index) => {
    if (!item) return;
    dispatch({
      type: TODO_ACTIONS.RESTORE_ITEM,
      payload: { item, index },
    });
    if (showToast) {
      showToast(`Restored "${item.name}"`, 'success');
    }
  };

  const deleteItem = (idOrName) => {
    const targetId = typeof idOrName === 'string' ? idOrName : idOrName?.id || idOrName?.name;
    const itemIndex = todoItems.findIndex((it) => (it.id ? it.id === targetId : it.name === targetId));
    const targetItem = itemIndex !== -1 ? todoItems[itemIndex] : null;

    dispatch({
      type: TODO_ACTIONS.DELETE_ITEM,
      payload: typeof idOrName === 'string' ? { id: idOrName, name: idOrName } : idOrName,
    });

    if (showToast) {
      if (targetItem) {
        showToast(
          `Deleted "${targetItem.name}"`,
          'info',
          5000,
          {
            label: 'Undo',
            onClick: () => restoreItem(targetItem, itemIndex),
          }
        );
      } else {
        showToast('Task removed', 'info');
      }
    }
  };

  const toggleItem = (idOrName) => {
    dispatch({
      type: TODO_ACTIONS.TOGGLE_ITEM,
      payload: typeof idOrName === 'string' ? { id: idOrName, name: idOrName } : idOrName,
    });
  };

  const togglePinItem = (idOrName) => {
    dispatch({
      type: TODO_ACTIONS.TOGGLE_PIN_ITEM,
      payload: typeof idOrName === 'string' ? { id: idOrName, name: idOrName } : idOrName,
    });
  };

  const moveItemUp = (idOrName) => {
    dispatch({
      type: TODO_ACTIONS.MOVE_ITEM_UP,
      payload: typeof idOrName === 'string' ? { id: idOrName, name: idOrName } : idOrName,
    });
  };

  const moveItemDown = (idOrName) => {
    dispatch({
      type: TODO_ACTIONS.MOVE_ITEM_DOWN,
      payload: typeof idOrName === 'string' ? { id: idOrName, name: idOrName } : idOrName,
    });
  };

  const duplicateItem = (idOrName) => {
    dispatch({
      type: TODO_ACTIONS.DUPLICATE_ITEM,
      payload: typeof idOrName === 'string' ? { id: idOrName, name: idOrName } : idOrName,
    });
    if (showToast) {
      showToast('Task duplicated successfully!', 'success');
    }
  };

  const updateItem = (id, updates) => {
    dispatch({
      type: TODO_ACTIONS.UPDATE_ITEM,
      payload: { id, updates },
    });
  };

  const clearAll = () => {
    dispatch({ type: TODO_ACTIONS.CLEAR_ALL });
    if (showToast) {
      showToast('All tasks cleared', 'info');
    }
  };

  const clearCompleted = () => {
    dispatch({ type: TODO_ACTIONS.CLEAR_COMPLETED });
    if (showToast) {
      showToast('Completed tasks cleared', 'info');
    }
  };

  const toggleAllCompleted = () => {
    dispatch({ type: TODO_ACTIONS.MARK_ALL_COMPLETED });
  };

  const addSubtask = (todoId, title) => {
    if (!title || !title.trim()) return;
    dispatch({
      type: TODO_ACTIONS.ADD_SUBTASK,
      payload: { todoId, title: title.trim() },
    });
  };

  const toggleSubtask = (todoId, subtaskId) => {
    dispatch({
      type: TODO_ACTIONS.TOGGLE_SUBTASK,
      payload: { todoId, subtaskId },
    });
  };

  const deleteSubtask = (todoId, subtaskId) => {
    dispatch({
      type: TODO_ACTIONS.DELETE_SUBTASK,
      payload: { todoId, subtaskId },
    });
  };

  const importTodos = (importedList, replace = false) => {
    if (!Array.isArray(importedList)) return;
    const validItems = importedList
      .filter((item) => item && typeof item.name === 'string' && item.name.trim())
      .map((item) => createTodoItem(item));

    if (validItems.length === 0) {
      if (showToast) showToast('No valid tasks found in file', 'danger');
      return;
    }

    const merged = replace ? validItems : [...validItems, ...todoItems];
    dispatch({ type: TODO_ACTIONS.SET_ITEMS, payload: merged });
    if (showToast) {
      showToast(`Successfully imported ${validItems.length} tasks!`, 'success');
    }
  };

  return (
    <TodoItemsContext.Provider
      value={{
        todoItems,
        addNewItem,
        deleteItem,
        restoreItem,
        moveItemUp,
        moveItemDown,
        toggleItem,
        togglePinItem,
        duplicateItem,
        updateItem,
        clearAll,
        clearCompleted,
        toggleAllCompleted,
        addSubtask,
        toggleSubtask,
        deleteSubtask,
        importTodos,
      }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoItemsContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoItemsContextProvider');
  }
  return context;
};
