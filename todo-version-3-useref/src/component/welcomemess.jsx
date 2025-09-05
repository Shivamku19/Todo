import styles from "./welcomemess.module.css"
const Welcomemess =({todoitems}) =>{
    return(
        todoitems.length===0 &&
        <p className={styles.welcome}>ENJOY YOUR DAY U R FREE</p>

    );
};
export default Welcomemess;