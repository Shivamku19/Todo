import styles from "./welcomemess.module.css";
import { useTodo } from "../store/todo-items-store";
import { RiSparklingLine, RiInboxLine, RiCheckboxCircleLine } from "react-icons/ri";

const Welcomemess = ({ todoitems: propItems }) => {
  const context = useTodo();
  const items = propItems !== undefined ? propItems : context.todoItems;
  const totalStoreTasks = context.todoItems.length;
  const activeStoreTasks = context.todoItems.filter((t) => !t.completed).length;

  if (items.length > 0) return null;

  // Case 1: Total tasks is 0
  if (totalStoreTasks === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>
          <RiInboxLine size={48} />
        </div>
        <h4 className={styles.emptyTitle}>No tasks yet</h4>
        <p className={styles.emptyText}>Add your first task above to get organized and stay on track!</p>
      </div>
    );
  }

  // Case 2: All tasks completed!
  if (activeStoreTasks === 0) {
    return (
      <div className={styles.celebrationContainer}>
        <div className={styles.celebrationIcon}>
          <RiSparklingLine size={44} />
        </div>
        <h4 className={styles.celebrationTitle}>All Caught Up! 🎉</h4>
        <p className={styles.celebrationSubtitle}>
          Awesome job! You have completed every task on your list. Enjoy your day!
        </p>
      </div>
    );
  }

  // Case 3: Filter/search resulted in 0 items
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIcon}>
        <RiCheckboxCircleLine size={44} />
      </div>
      <h5 className={styles.emptyTitle}>No matching tasks</h5>
      <p className={styles.emptyText}>Try adjusting your search query, status filter, or tags.</p>
    </div>
  );
};

export default Welcomemess;

