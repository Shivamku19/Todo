import Header from "./component/header";
import Item1 from "./component/item1";
import Todoitems from "./component/todoitems";
import Welcomemess from "./component/welcomemess";

import "./App.css";
import { useState } from "react";

function App() {
  const [todoitems, settodoitems] = useState([]);
  const handlenewitem = (itemname, itemduedate) => {
    const newtodoitems = [
      ...todoitems,
      { name: itemname, duedate: itemduedate },
    ];
    settodoitems(newtodoitems);
  };
  const handledeleteitem = (todoitemname) => {
    const newtodoitems = todoitems.filter((item) => item.name != todoitemname);
    settodoitems(newtodoitems);
  };

  return (
    <div className="todo-container">
      <Header></Header>
      <Item1 onnewitem={handlenewitem}></Item1>
        <Welcomemess todoitems={todoitems}></Welcomemess>

      <Todoitems
        todoitems={todoitems}
        ondeleteclk={handledeleteitem}
      ></Todoitems>
    </div>
  );
}

export default App;
