import styles from "./Expense.module.css";
import { hasValidToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { deleteExpense } from "../../utils/expenseApi";
import { useQueryClient } from "@tanstack/react-query";

export type ExpenseData = {
  id: number;
  title: string;
  category: { id: number; name: string };
  value: number;
  createdAt: string;
};

type ExpenseProps = {
  id: number;
  title: string;
  category: { id: number; name: string };
  amount: number;
  date: string;
  onEdit?: (
    title: string,
    category: { id: number; name: string },
    amount: number,
    id: number
  ) => void;
};

export default function Expense({
  title,
  category,
  amount,
  date,
  id,
  onEdit,
}: ExpenseProps) {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  // why is month 0-11...
  const parsedDate = new Date(date);

  async function deleteHandler() {
    if (!hasValidToken()) {
      return nav("/auth");
    }
    const response = await deleteExpense(id);
    if (!response.ok) {
      if (response.status === 404) {
        alert("Expense wasn't found.");
      }
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["expenses"] });
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
