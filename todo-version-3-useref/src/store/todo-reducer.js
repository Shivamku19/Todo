import { TODO_ACTIONS } from './todo-action-types';
import { createTodoItem } from '../models/todo';

/**
 * Pure Reducer for Todo Items
 * @param {Array} state - Current array of todo items
 * @param {Object} action - Action object containing type and payload
 * @returns {Array} New state array
 */
export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD_ITEM: {
      const newItem = typeof action.payload === 'object' && action.payload.id
        ? action.payload
        : createTodoItem(action.payload);
      return [newItem, ...state];
    }

    case TODO_ACTIONS.DELETE_ITEM: {
      const targetId = action.payload.id || action.payload.name;
      return state.filter((item) => (item.id ? item.id !== targetId : item.name !== targetId));
    }

    case TODO_ACTIONS.RESTORE_ITEM: {
      const { item, index } = action.payload;
      if (!item) return state;
      const newState = [...state];
      if (typeof index === 'number' && index >= 0 && index <= state.length) {
        newState.splice(index, 0, item);
      } else {
        newState.unshift(item);
      }
      return newState;
    }

    case TODO_ACTIONS.MOVE_ITEM_UP: {
      const targetId = action.payload.id || action.payload.name;
      const index = state.findIndex((item) => (item.id ? item.id === targetId : item.name === targetId));
      if (index <= 0) return state;
      const newState = [...state];
      const temp = newState[index];
      newState[index] = newState[index - 1];
      newState[index - 1] = temp;
      return newState;
    }

    case TODO_ACTIONS.MOVE_ITEM_DOWN: {
      const targetId = action.payload.id || action.payload.name;
      const index = state.findIndex((item) => (item.id ? item.id === targetId : item.name === targetId));
      if (index === -1 || index >= state.length - 1) return state;
      const newState = [...state];
      const temp = newState[index];
      newState[index] = newState[index + 1];
      newState[index + 1] = temp;
      return newState;
    }

    case TODO_ACTIONS.TOGGLE_ITEM: {
      const targetId = action.payload.id || action.payload.name;
      return state.map((item) => {
        const matches = item.id ? item.id === targetId : item.name === targetId;
        if (!matches) return item;
        return {
          ...item,
          completed: !item.completed,
          updatedAt: new Date().toISOString(),
        };
      });
    }

    case TODO_ACTIONS.TOGGLE_PIN_ITEM: {
      const targetId = action.payload.id || action.payload.name;
      return state.map((item) => {
        const matches = item.id ? item.id === targetId : item.name === targetId;
        if (!matches) return item;
        return {
          ...item,
          isPinned: !item.isPinned,
          updatedAt: new Date().toISOString(),
        };
      });
    }

    case TODO_ACTIONS.INCREMENT_POMODORO: {
      const targetId = action.payload.id || action.payload.name;
      return state.map((item) => {
        const matches = item.id ? item.id === targetId : item.name === targetId;
        if (!matches) return item;
        return {
          ...item,
          pomodoros: (Number(item.pomodoros) || 0) + 1,
          updatedAt: new Date().toISOString(),
        };
      });
    }

    case TODO_ACTIONS.DUPLICATE_ITEM: {
      const targetId = action.payload.id || action.payload.name;
      const index = state.findIndex((item) => (item.id ? item.id === targetId : item.name === targetId));
      if (index === -1) return state;
      const original = state[index];
      const timestamp = new Date().toISOString();
      const clonedId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'todo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

      const clonedItem = {
        ...original,
        id: clonedId,
        name: `${original.name} (Copy)`,
        completed: false,
        subtasks: Array.isArray(original.subtasks)
          ? original.subtasks.map((s) => ({
              ...s,
              id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
              completed: false,
            }))
          : [],
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      const newState = [...state];
      newState.splice(index + 1, 0, clonedItem);
      return newState;
    }

    case TODO_ACTIONS.UPDATE_ITEM: {
      const { id, updates } = action.payload;
      return state.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      });
    }

    case TODO_ACTIONS.CLEAR_ALL: {
      return [];
    }

    case TODO_ACTIONS.CLEAR_COMPLETED: {
      return state.filter((item) => !item.completed);
    }

    case TODO_ACTIONS.MARK_ALL_COMPLETED: {
      const allCompleted = state.length > 0 && state.every((item) => item.completed);
      return state.map((item) => ({
        ...item,
        completed: !allCompleted,
        updatedAt: new Date().toISOString(),
      }));
    }

    case TODO_ACTIONS.ADD_SUBTASK: {
      const { todoId, title } = action.payload;
      return state.map((item) => {
        if (item.id !== todoId) return item;
        const newSubtask = {
          id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          title: title.trim(),
          completed: false,
        };
        const currentSubtasks = Array.isArray(item.subtasks) ? item.subtasks : [];
        return {
          ...item,
          subtasks: [...currentSubtasks, newSubtask],
          updatedAt: new Date().toISOString(),
        };
      });
    }

    case TODO_ACTIONS.TOGGLE_SUBTASK: {
      const { todoId, subtaskId } = action.payload;
      return state.map((item) => {
        if (item.id !== todoId) return item;
        const currentSubtasks = Array.isArray(item.subtasks) ? item.subtasks : [];
        return {
          ...item,
          subtasks: currentSubtasks.map((sub) =>
            sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          ),
          updatedAt: new Date().toISOString(),
        };
      });
    }

    case TODO_ACTIONS.DELETE_SUBTASK: {
      const { todoId, subtaskId } = action.payload;
      return state.map((item) => {
        if (item.id !== todoId) return item;
        const currentSubtasks = Array.isArray(item.subtasks) ? item.subtasks : [];
        return {
          ...item,
          subtasks: currentSubtasks.filter((sub) => sub.id !== subtaskId),
          updatedAt: new Date().toISOString(),
        };
      });
    }

    case TODO_ACTIONS.SET_ITEMS: {
      return Array.isArray(action.payload) ? action.payload : [];
    }

    default:
      return state;
  }
}
