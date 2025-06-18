import EditModal from "./EditModal";
import Expense from "./Expense";
import styles from "./Home.module.css";
import { Suspense, useRef } from "react";
import { hasValidToken } from "../../utils/auth";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { fetchExpenses, getCategories } from "../../utils/expenseApi";

export default function Home() {
  const editModal = useRef();
  const nav = useNavigate();

  const { expenses, categories } = useLoaderData();

  const localExpenses = JSON.parse(sessionStorage.getItem("expenses"));
  console.log("home:", localExpenses);

  expenses.then((data) => {
    if (!data.invalid) {
      sessionStorage.setItem("expenses", JSON.stringify(data));
    } else {
      sessionStorage.removeItem("expenses");
    }
  });

  function editHandler(title, category, amount, id) {
    if (!hasValidToken()) {
      return nav("/auth");
    }
    editModal.current.open(title, category, amount, id);
  }
  const ExpensesFallback = (
    <>
      {localExpenses === null && (
        <h1 className={styles.filler}>Fetching Expenses...</h1>
      )}
      {localExpenses &&
        !localExpenses.invalid &&
        (localExpenses.length > 0 ? (
          localExpenses.map((expense) => {
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
  console.log(categories);
  return { expenses, categories };
}
