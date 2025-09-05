import Header from "./component/header";
import Item1 from "./component/item1";
import Item2 from "./component/item2";
import Item3 from "./component/item3";

import "./App.css";

function App() {
  return (
    
      <div className="todo-container">
       <Header></Header>
      <Item1></Item1>
      <div >
        <Item2></Item2>
        <Item3></Item3>
      </div>

    </div>
    
    
  );
}

export default App;
