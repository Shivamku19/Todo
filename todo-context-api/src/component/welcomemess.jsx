import styles from "./welcomemess.module.css"
import { useContext } from "react";
import { todoitemcontext } from "../store/todo-items-store";
const Welcomemess =() =>{
   
     const {todoitems} = useContext(todoitemcontext);
 
    return(
        todoitems.length===0 &&
        <p className={styles.welcome}>ENJOY YOUR DAY U R FREE</p>

    );
};
export default Welcomemess;