import Todoitem from "./todoitem"
const Todoitems = ({todoitems}) => {
  return (
   
    <div className="items-container">
         {todoitems.map((index) =>(<Todoitem tododate={index.duedate} todoname={index.name}></Todoitem>))}
      
      
    </div>
  );
};
export default Todoitems;
