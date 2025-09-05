import { useRef } from "react";
import { useContext } from "react";
import { todoitemcontext } from "../store/todo-items-store";

import { RiAddCircleFill } from "react-icons/ri";

function Item1(){
  const {addnewitem} = useContext(todoitemcontext);
  const todonameelement=useRef();
  const duedateelement=useRef();

  const handlebuttonclk=(event) =>{
    const todoname=todonameelement.current.value;
    const duedate=duedateelement.current.value;
    todonameelement.current.value="";
    duedateelement.current.value="";
    addnewitem(todoname,duedate);

  }
  const {deleteitem}=useContext(todoitemcontext);
    



    return(
        <div className="container">
             <div className="row kg-row">
          <div className="col-6">
            <input type="text" className="todo" placeholder="Enter Todo Here"
            ref={todonameelement}
             />
          </div>
          <div className="col-4">
            <input type="date" className="inputdate"
            ref={duedateelement}
           />
          </div>
          <div className="col-2">
            <button type="button" className="btn btn-success btns " onClick={handlebuttonclk}>
              <RiAddCircleFill />
            </button>
          </div>
          </div>
        </div>
       

    )
};
export default Item1;