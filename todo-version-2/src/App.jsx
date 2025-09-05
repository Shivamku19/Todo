import Header from "./component/header";
import Item1 from "./component/item1";
import Todoitems from "./component/todoitems";


import "./App.css";

function App() {
  const todoitems =[
    { name:"buy milk",
      duedate:"15/08/2025",

    },
    {
      name:"go to college",
      duedate:"15/08/2025",
    },
    {
      name:"take lunch",
      duedate:"just now",
    }
  ]
  
  return (
    
      <div className="todo-container">
       <Header></Header>
      <Item1></Item1>
      <Todoitems todoitems={todoitems}></Todoitems>
      
       

        
    

    </div>
    
    
  );
}

export default App;
