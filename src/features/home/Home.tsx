import EditModal, { EditModalHandler } from "./EditModal";
import Expense, { ExpenseData } from "./Expense";
import styles from "./Home.module.css";
import { ReactNode, Suspense, useRef } from "react";
import { hasValidToken } from "../../utils/auth";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { fetchExpenses, getCategories } from "../../utils/expenseApi";
import { useQueries, useQuery } from "@tanstack/react-query";

export default function Home() {
  const editModal = useRef<EditModalHandler>(null);
  const nav = useNavigate();

  // const { expenses, categories } = useLoaderData();

  const expenses = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  function editHandler(
    title: string,
    category: { id: number; name: string },
    amount: number,
    id: number
  ) {
    if (!hasValidToken()) {
      return nav("/auth");
    }
    if (editModal !== null && editModal.current != null) {
      editModal.current.open({ title, category, amount, id });
    }
  }
  return (
    <>
      <div className={styles.scrollContainer}>
        {expenses.isFetching && (
          <h1 className={styles.filler}>Fetching Expenses...</h1>
        )}
        {expenses.isError && (
          <h1 className={styles.filler}>Error Fetching...</h1>
        )}
        {expenses.isFetched &&
          !expenses.isError &&
          (expenses.data?.length! > 0 ? (
            expenses.data?.map((expense: ExpenseData) => {
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
          ))}
      </div>
      <EditModal ref={editModal} />
    </>
  );
}
