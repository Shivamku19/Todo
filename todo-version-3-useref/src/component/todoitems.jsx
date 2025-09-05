import Todoitem from "./todoitem"
const Todoitems = ({todoitems,ondeleteclk}) => {
  return (
   
    <div className="items-container">
         {todoitems.map((index) =>(<Todoitem tododate={index.duedate} todoname={index.name} ondeleteclk={ondeleteclk}></Todoitem>))}
      
      
    </div>
  );
};
export default Todoitems;
