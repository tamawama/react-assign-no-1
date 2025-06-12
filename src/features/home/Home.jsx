import EditModal from "./EditModal";
import Expense from "./Expense";
import styles from "./Home.module.css";
import { useRef } from "react";
import { hasValidToken } from "../../utils/auth";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getCategories, getExpenses } from "../../utils/expenseApi";

export default function Home() {
  const editModal = useRef();
  const nav = useNavigate();
  const { expenses, categories } = useLoaderData();
  function editHandler(title, category, amount, id) {
    if (!hasValidToken()) {
      return nav("/auth");
    }
    editModal.current.open(title, category, amount, id);
  }
  return (
    <>
      <div className={styles.scrollContainer}>
        {expenses.length > 0 ? (
          expenses.map((expense) => {
            return (
              <Expense
                key={`_expense${expense.id}`}
                title={expense.title}
                category={expense.category}
                amount={expense.value}
                date={expense.createdAt}
                id={expense.id}
                onEdit={editHandler}
              />
            );
          })
        ) : (
          <h1 className={styles.filler}>No Expenses Added...</h1>
        )}
      </div>
      <EditModal ref={editModal} categories={categories} />
    </>
  );
}

export async function loader() {
  const response = await getExpenses();
  if (!response.ok) {
    return response;
  }
  const expenses = await response.json();
  const categoryResponse = await getCategories();
  if (!categoryResponse.ok) {
    return categoryResponse;
  }
  const categories = await categoryResponse.json();
  return { expenses, categories };
}
