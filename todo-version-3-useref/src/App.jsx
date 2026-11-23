import Header from "./component/header";
import Item1 from "./component/item1";
import Todoitems from "./component/todoitems";
import Welcomemess from "./component/welcomemess";
import { TodoItemsContextProvider } from "./store/todo-items-store";
import { ToastProvider } from "./context/ToastContext";
import "./App.css";

function AppContent() {
  return (
    <div className="todo-container container py-4">
      <Header />
      <Item1 />
      <Welcomemess />
      <Todoitems />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <TodoItemsContextProvider>
        <AppContent />
      </TodoItemsContextProvider>
    </ToastProvider>
  );
}

export default App;
