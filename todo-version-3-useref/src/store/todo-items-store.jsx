import { createContext, useContext, useReducer } from 'react';
import { todoReducer } from './todo-reducer';
import { TODO_ACTIONS } from './todo-action-types';
import { createTodoItem, PRIORITY_LEVELS } from '../models/todo';

export const TodoItemsContext = createContext({
  todoItems: [],
  addNewItem: () => {},
  deleteItem: () => {},
  toggleItem: () => {},
  updateItem: () => {},
  clearAll: () => {},
});

const INITIAL_TODOS = [
  createTodoItem({
    name: 'Complete React 10-day roadmap planning',
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

export const TodoItemsContextProvider = ({ children }) => {
  const [todoItems, dispatch] = useReducer(todoReducer, INITIAL_TODOS);

  const addNewItem = (itemData) => {
    dispatch({
      type: TODO_ACTIONS.ADD_ITEM,
      payload: itemData,
    });
  };

  const deleteItem = (idOrName) => {
    dispatch({
      type: TODO_ACTIONS.DELETE_ITEM,
      payload: typeof idOrName === 'string' ? { id: idOrName, name: idOrName } : idOrName,
    });
  };

  const toggleItem = (idOrName) => {
    dispatch({
      type: TODO_ACTIONS.TOGGLE_ITEM,
      payload: typeof idOrName === 'string' ? { id: idOrName, name: idOrName } : idOrName,
    });
  };

  const updateItem = (id, updates) => {
    dispatch({
      type: TODO_ACTIONS.UPDATE_ITEM,
      payload: { id, updates },
    });
  };

  const clearAll = () => {
    dispatch({ type: TODO_ACTIONS.CLEAR_ALL });
  };

  return (
    <TodoItemsContext.Provider
      value={{
        todoItems,
        addNewItem,
        deleteItem,
        toggleItem,
        updateItem,
        clearAll,
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
