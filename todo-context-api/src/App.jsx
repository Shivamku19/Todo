import Header from "./component/header";
import Item1 from "./component/item1";
import Todoitems from "./component/todoitems";
import Welcomemess from "./component/welcomemess";

import "./App.css";
import { useState } from "react";
import { todoitemcontext } from "./store/todo-items-store";

function App() {
  const [todoitems, settodoitems] = useState([]);
  const addnewitem = (itemname, itemduedate) => {
    const newtodoitems = [
      ...todoitems,
      { name: itemname, duedate: itemduedate },
    ];
    settodoitems(newtodoitems);
  };
  const deleteitem = (todoitemname) => {
    const newtodoitems = todoitems.filter((item) => item.name != todoitemname);
    settodoitems(newtodoitems);
  };
  
  return (
    <todoitemcontext.Provider value={{
      todoitems:todoitems,
      addnewitem:addnewitem,
      deleteitem:deleteitem,

    }}>
    <div className="todo-container">
      <Header></Header>
      <Item1></Item1>
        <Welcomemess ></Welcomemess>

      <Todoitems
      ></Todoitems>
    </div>
    </todoitemcontext.Provider>
  );
}

export default App;
