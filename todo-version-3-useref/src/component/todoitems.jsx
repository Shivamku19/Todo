import Todoitem from "./todoitem";
import { useTodo } from "../store/todo-items-store";

const Todoitems = ({ todoitems: propItems, ondeleteclk, ontoggleclk, onupdateclk, sortBy = 'default' }) => {
  const context = useTodo();
  const items = propItems !== undefined ? propItems : context.todoItems;
  const handleDelete = ondeleteclk || context.deleteItem;
  const handleToggle = ontoggleclk || context.toggleItem;
  const handleUpdate = onupdateclk || context.updateItem;
  const allowReorder = sortBy === 'manual' || sortBy === 'default';

  return (
    <div className="items-container" role="list">
      {items.map((item, index) => (
        <Todoitem
          key={item.id || `${item.name}-${index}`}
          item={item}
          tododate={item.dueDate || item.duedate || ''}
          todoname={item.name}
          ondeleteclk={handleDelete}
          ontoggleclk={handleToggle}
          onupdateclk={handleUpdate}
          canMoveUp={allowReorder && index > 0}
          canMoveDown={allowReorder && index < items.length - 1}
        />
      ))}
    </div>
  );
};

export default Todoitems;
