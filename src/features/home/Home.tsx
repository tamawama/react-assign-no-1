import EditModal, { EditModalHandler } from "./EditModal";
import Expense, { ExpenseData } from "./Expense";
import styles from "./Home.module.css";
import { ReactNode, Suspense, useRef } from "react";
import { hasValidToken } from "../../utils/auth";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { fetchExpenses, getCategories } from "../../utils/expenseApi";

export default function Home() {
  const editModal = useRef<EditModalHandler>(null);
  const nav = useNavigate();

  const { expenses, categories } = useLoaderData();

  const localExpenses = JSON.parse(sessionStorage.getItem("expenses") || "{}");

  // @ts-ignore idk how to properly type data here
  expenses.then((data) => {
    if (!data.invalid) {
      sessionStorage.setItem("expenses", JSON.stringify(data));
    } else {
      sessionStorage.removeItem("expenses");
    }
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
  const ExpensesFallback = (
    <>
      {localExpenses === null && (
        <h1 className={styles.filler}>Fetching Expenses...</h1>
      )}
      {localExpenses &&
        !localExpenses.invalid &&
        (localExpenses.length > 0 ? (
          localExpenses.map((expense: ExpenseData) => {
            return (
              <Expense
                key={`_expense${expense.id}`}
                title={expense.title}
                category={expense.category}
                amount={expense.value}
                date={expense.createdAt}
                id={expense.id}
              />
            );
          })
        ) : (
          <h1 className={styles.filler}>No Expenses Added...</h1>
        ))}
    </>
  );
  return (
    <>
      <div className={styles.scrollContainer}>
        <Suspense fallback={ExpensesFallback}>
          <Await resolve={expenses}>
            {(expenses) => (
              <>
                {" "}
                {expenses === null && (
                  <h1 className={styles.filler}>Fetching Expenses...</h1>
                )}
                {expenses && expenses.invalid && (
                  <h1 className={styles.filler}>Error Fetching...</h1>
                )}
                {expenses &&
                  !expenses.invalid &&
                  (expenses.length > 0 ? (
                    expenses.map((expense: ExpenseData) => {
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
              </>
            )}
          </Await>
        </Suspense>
      </div>
      <EditModal ref={editModal} categories={categories} />
    </>
  );
}

export async function loader() {
  const expenses = new Promise((res) => {
    async function innerExpensesPromise() {
      const expensesRes = await fetchExpenses();
      if (expensesRes.ok) {
        const expensesData = await expensesRes.json();
        res(expensesData);
      } else {
        res({ invalid: true });
      }
    }
    innerExpensesPromise();
  });

  const categoryResponse = await getCategories();
  const categories = await categoryResponse.json();
  return { expenses, categories };
}
