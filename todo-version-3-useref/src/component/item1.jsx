import { useRef, useEffect, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { useTodo } from "../store/todo-items-store";
import { PRIORITY_LEVELS, DEFAULT_CATEGORIES } from "../models/todo";

function Item1({ onnewitem }) {
  const context = useTodo();
  const todonameelement = useRef();
  const duedateelement = useRef();
  const [priority, setPriority] = useState(PRIORITY_LEVELS.MEDIUM);
  const [category, setCategory] = useState("General");

  useEffect(() => {
    todonameelement.current?.focus();
  }, []);

  const handlebuttonclk = (event) => {
    if (event) event.preventDefault();
    const todoname = todonameelement.current.value.trim();
    const duedate = duedateelement.current.value;

    if (!todoname) return;

    todonameelement.current.value = "";
    duedateelement.current.value = "";

    const newItemData = {
      name: todoname,
      dueDate: duedate,
      priority,
      category,
    };

    if (onnewitem) {
      onnewitem(newItemData);
    } else {
      context.addNewItem(newItemData);
    }

    setPriority(PRIORITY_LEVELS.MEDIUM);
    setCategory("General");
  };

  return (
    <div className="container px-0 mb-3">
      <form onSubmit={handlebuttonclk} className="task-input-form p-3 rounded border bg-light shadow-sm">
        <div className="input-group mb-2">
          <input
            type="text"
            className="todo form-control"
            placeholder="What needs to be done?"
            ref={todonameelement}
          />
          <button
            type="submit"
            className="btn btn-success btns d-flex align-items-center gap-1 px-3"
            title="Add Task"
          >
            <RiAddCircleFill size={20} />
            <span>Add</span>
          </button>
        </div>
        <div className="row g-2 align-items-center">
          <div className="col-md-4 col-12">
            <input
              type="date"
              className="inputdate form-control form-control-sm"
              ref={duedateelement}
              title="Due date"
            />
          </div>
          <div className="col-md-4 col-6">
            <select
              className="form-select form-select-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              title="Priority"
            >
              {Object.entries(PRIORITY_LEVELS).map(([key, val]) => (
                <option key={val} value={val}>
                  {key.charAt(0) + key.slice(1).toLowerCase()} Priority
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 col-6">
            <select
              className="form-select form-select-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              title="Category"
            >
              {DEFAULT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Item1;
