import { useCallback, useContext } from "react";
import styles from "./Expense.module.css";
import { useExpenseDispatch } from "../../contexts/ExpenseContext";

export default function Expense({ title, category, amount, date, id, onEdit }) {
  const dispatchExpense = useExpenseDispatch();

  // why is month 0-11...
  const [year, month, day] = date.split("-");
  const parsedDate = new Date(year, month - 1, day);

  function deleteHandler() {
    dispatchExpense({ type: "delete", title, category, amount, date, id });
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
