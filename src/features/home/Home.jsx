import EditModal from "./EditModal";
import Expense from "./Expense";
import styles from "./Home.module.css";
import { useRef } from "react";
import { useExpense } from "../../contexts/ExpenseContext";

export default function Home() {
  const expenses = useExpense().expenses;
  const editModal = useRef();
  function editHandler(title, category, amount, date, id) {
    editModal.current.open(title, category, amount, date, id);
  }
  return (
    <>
      <div className={styles.scrollContainer}>
        {expenses.length > 0 ? (
          expenses.map((expense) => {
            return (
              <Expense
                key={`_expense${Math.random()}`}
                title={expense.title}
                category={expense.category}
                amount={expense.amount}
                date={expense.date}
                id={expense.id}
                onEdit={editHandler}
              />
            );
          })
        ) : (
          <h1 className={styles.filler}>No Expenses Added...</h1>
        )}
      </div>
      <EditModal ref={editModal} />
    </>
  );
}
