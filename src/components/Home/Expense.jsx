import { useCallback, useContext } from "react";
import styles from "./Expense.module.css";
import { ExpenseContext } from "../../App";

export default function Expense({ title, category, amount, date, id, onEdit }) {
  console.log(date);
  const [year, month, day] = date.split("-");
  console.log(year, month, day);
  // why is month 0-11...
  const parsedDate = new Date(year, month - 1, day);
  const dispatch = useContext(ExpenseContext);
  function deleteHandler() {
    dispatch({ type: "delete", title, category, amount, date, id });
  }
  //
  return (
    <>
      <div className={styles.expenseContainer}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <h2 className={styles.category}>{category}</h2>
          <p className={styles.amount}>{"$" + amount}</p>
        </div>
        <p className={styles.date}>{parsedDate.toDateString()}</p>
        <div className={styles.buttons}>
          <button
            id={styles.edit}
            onClick={() => onEdit(title, category, amount, date, id)}
          >
            edit
          </button>
          <button id={styles.delete} onClick={deleteHandler}>
            delete
          </button>
        </div>
      </div>
    </>
  );
}
