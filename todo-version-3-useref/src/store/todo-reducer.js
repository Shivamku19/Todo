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

    case TODO_ACTIONS.SET_ITEMS: {
      return Array.isArray(action.payload) ? action.payload : [];
    }

    default:
      return state;
  }
}
