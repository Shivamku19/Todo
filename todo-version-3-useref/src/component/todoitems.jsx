import Todoitem from "./todoitem";
import { useTodo } from "../store/todo-items-store";

const Todoitems = ({ todoitems: propItems, ondeleteclk, ontoggleclk }) => {
  const context = useTodo();
  const items = propItems !== undefined ? propItems : context.todoItems;
  const handleDelete = ondeleteclk || context.deleteItem;
  const handleToggle = ontoggleclk || context.toggleItem;

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
        />
      ))}
    </div>
  );
};

export default Todoitems;
