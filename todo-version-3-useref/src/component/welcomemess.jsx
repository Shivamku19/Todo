import styles from "./welcomemess.module.css";
import { useTodo } from "../store/todo-items-store";

const Welcomemess = ({ todoitems: propItems }) => {
  const context = useTodo();
  const items = propItems !== undefined ? propItems : context.todoItems;

  return (
    items.length === 0 && (
      <p className={styles.welcome}>ENJOY YOUR DAY U R FREE</p>
    )
  );
};

export default Welcomemess;
