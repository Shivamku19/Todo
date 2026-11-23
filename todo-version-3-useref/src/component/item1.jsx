import { useRef } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { useTodo } from "../store/todo-items-store";

function Item1({ onnewitem }) {
  const context = useTodo();
  const todonameelement = useRef();
  const duedateelement = useRef();

  const handlebuttonclk = (event) => {
    if (event) event.preventDefault();
    const todoname = todonameelement.current.value.trim();
    const duedate = duedateelement.current.value;

    if (!todoname) return;

    todonameelement.current.value = "";
    duedateelement.current.value = "";

    if (onnewitem) {
      onnewitem(todoname, duedate);
    } else {
      context.addNewItem({ name: todoname, dueDate: duedate });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handlebuttonclk} className="row kg-row">
        <div className="col-6">
          <input
            type="text"
            className="todo form-control"
            placeholder="Enter Todo Here"
            ref={todonameelement}
          />
        </div>
        <div className="col-4">
          <input
            type="date"
            className="inputdate form-control"
            ref={duedateelement}
          />
        </div>
        <div className="col-2">
          <button
            type="submit"
            className="btn btn-success btns d-flex align-items-center justify-content-center"
            title="Add Task"
          >
            <RiAddCircleFill size={22} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Item1;
