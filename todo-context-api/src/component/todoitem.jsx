import { useContext } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { todoitemcontext } from "../store/todo-items-store";
function Todoitem({todoname,tododate}){
  const {deleteitem} =useContext(todoitemcontext)
    return(
        <div className="container ">
            <div className="row kg-row">
          <div className="col-6">{todoname}</div>
          <div className="col-4">{tododate}</div>
          <div className="col-2">
            <button type="button" className="btn btn-danger btns" onClick={() =>deleteitem(todoname)}>
             <RiDeleteBin5Line />
            </button>
          </div>
        </div>

        </div>
        

    )
}; export default Todoitem;