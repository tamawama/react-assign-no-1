import styles from "./Expense.module.css";
import { hasValidToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { deleteExpense } from "../../utils/expenseApi";

export default function Expense({ title, category, amount, date, id, onEdit }) {
  const nav = useNavigate();
  // why is month 0-11...
  const parsedDate = new Date(date);

  async function deleteHandler() {
    if (!hasValidToken()) {
      return nav("/auth");
    }
    const response = await deleteExpense(id);
    if (!response.ok || response.status === 404 || response.status === 500) {
      return;
    }
    return nav("");
  }
  //
  return (
    <>
      <div className={styles.expenseContainer}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <h2 className={styles.category}>{category.name}</h2>
          <p className={styles.amount}>{"$" + amount}</p>
        </div>
        <p className={styles.date}>{parsedDate.toDateString()}</p>
        <div className={styles.buttons}>
          {onEdit && (
            <>
              <button
                id={styles.edit}
                onClick={() => onEdit(title, category, amount, id)}
              >
                edit
              </button>
              <button id={styles.delete} onClick={deleteHandler}>
                delete
              </button>
            </>
          )}
          {!onEdit && <button id={styles.edit}>connecting...</button>}
        </div>
      </div>
    </>
  );
}
