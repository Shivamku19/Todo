/**
 * Task Data Model & Factory Helper
 * Standardizes the data structure for todos across the application.
 */

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const DEFAULT_CATEGORIES = ['General', 'Work', 'Personal', 'Shopping', 'Fitness'];

/**
 * Creates a normalized Todo item object.
 * @param {Object} params
 * @param {string} params.name - Title / text of the todo
 * @param {string} [params.dueDate] - Due date string (YYYY-MM-DD)
 * @param {string} [params.dueTime] - Due time string (HH:MM)
 * @param {string} [params.priority] - Priority level: low, medium, high, urgent
 * @param {string} [params.description] - Detailed notes or context
 * @param {string} [params.category] - Category/project name
 * @param {Array<string>} [params.tags] - Array of tag labels
 * @returns {Object} normalized todo item
 */
export function createTodoItem({
  name = '',
  dueDate = '',
  dueTime = '',
  priority = PRIORITY_LEVELS.MEDIUM,
  description = '',
  category = 'General',
  tags = [],
  subtasks = [],
} = {}) {
  const timestamp = new Date().toISOString();
  const id = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'todo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

  return {
    id,
    name: name.trim(),
    description: description.trim(),
    dueDate,
    dueTime,
    priority: Object.values(PRIORITY_LEVELS).includes(priority) ? priority : PRIORITY_LEVELS.MEDIUM,
    category: category.trim() || 'General',
    tags: Array.isArray(tags) ? tags : [],
    subtasks: Array.isArray(subtasks) ? subtasks : [],
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
