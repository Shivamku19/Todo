import { useContext } from "react";
import Todoitem from "./todoitem";
import { todoitemcontext } from "../store/todo-items-store";
const Todoitems = () => {
  const { todoitems} = useContext(todoitemcontext);

  return (
    <div className="items-container">
      {todoitems.map((index) => (
        <Todoitem
        
          tododate={index.duedate}
          todoname={index.name}
          
         
        ></Todoitem>
       ))}
    </div>
  );
};
export default Todoitems;
