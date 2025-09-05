import { RiDeleteBin5Line } from "react-icons/ri";
function Todoitem({todoname,tododate,ondeleteclk}){
    return(
        <div className="container ">
            <div className="row kg-row">
          <div className="col-6">{todoname}</div>
          <div className="col-4">{tododate}</div>
          <div className="col-2">
            <button type="button" className="btn btn-danger btns" onClick={() =>ondeleteclk(todoname)}>
             <RiDeleteBin5Line />
            </button>
          </div>
        </div>

        </div>
        

    )
}; export default Todoitem;