import { createContext, memo, useReducer, useState } from "react";
import CreateExpense from "./components/CreateExpense";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import dummydata from "./dummydata";

function expenseDispatcher(state, action) {
  switch (action.type) {
    case "edit":
      const expenseIndex = state.expenses.findIndex((expense) => {
        return expense.id === action.id;
      });
      const newExpense = {
        title: action.title,
        category: action.category,
        amount: action.amount,
        date: action.date,
        id: action.id,
      };

      console.log(action, expenseIndex);
      if (expenseIndex < 0) {
        break;
      }
      const newExpenses = { expenses: [...state.expenses], id: state.id };

      newExpenses.expenses.splice(expenseIndex, 1, newExpense);
      console.log(newExpense, newExpenses);
      return newExpenses;
      break;
    case "create":
      const expense = {
        title: action.title,
        category: action.category,
        amount: action.amount,
        date: action.date,
        id: state.id,
      };
      return { expenses: [...state.expenses, expense], id: state.id + 1 };
      break;
    case "delete":
      return {
        expenses: state.expenses.filter((expense) => {
          return expense.id !== action.id;
        }),
        id: state.id,
      };
      break;
  }
  return { ...state };
}

export const ExpenseContext = createContext();

function App() {
  const [sidebar, setSidebar] = useState(true);
  // const [expenses, dispatchExpense] = useReducer(expenseDispatcher, {
  //   expenses: [],
  //   id: 0,
  // });
  const [expenses, dispatchExpense] = useReducer(expenseDispatcher, {
    expenses: dummydata,
    id: 0,
  });
  const [page, setPage] = useState("home");

  function handleSidebarClick(page) {
    // are you sure button perhaps?
    setPage("page");
  }

  return (
    <>
      <div className="div-container">
        <Header sidebarToggle={setSidebar} />
        {/* need to adjust css with the sidebar "aside" */}
        <main>
          {sidebar && <Sidebar setPage={setPage}></Sidebar>}
          <ExpenseContext.Provider value={dispatchExpense}>
            {page === "home" && <Home expenses={expenses.expenses} />}
            {page === "create" && <CreateExpense onCancel={setPage} />}
          </ExpenseContext.Provider>
          {page === "login" && <Login pageHandler={setPage} />}
        </main>
      </div>
    </>
  );
}

export default App;
