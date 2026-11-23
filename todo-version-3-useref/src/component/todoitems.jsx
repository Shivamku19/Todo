import Todoitem from "./todoitem";
import { useTodo } from "../store/todo-items-store";

const Todoitems = ({ todoitems: propItems, ondeleteclk }) => {
  const context = useTodo();
  const items = propItems !== undefined ? propItems : context.todoItems;
  const handleDelete = ondeleteclk || context.deleteItem;

  return (
    <div className="items-container">
      {items.map((item) => (
        <Todoitem
          key={item.id || item.name}
          item={item}
          tododate={item.dueDate || item.duedate}
          todoname={item.name}
          ondeleteclk={handleDelete}
        />
      ))}
    </div>
  );
};

export default Todoitems;
