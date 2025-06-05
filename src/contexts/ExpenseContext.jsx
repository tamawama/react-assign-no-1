import { useReducer, createContext, useContext } from "react";
import dummydata from "../dummydata.js";

const ExpenseContext = createContext(null);
const DispatchContext = createContext(null);

export function ExpenseProvider({ children }) {
  // const [expenses, dispatchExpense] = useReducer(expenseDispatcher, {
  //   expenses: [],
  //   id: 0,
  // });
  const [expenses, dispatchExpense] = useReducer(expenseReducer, {
    expenses: dummydata,
    id: 0,
  });

  return (
    <ExpenseContext value={expenses}>
      <DispatchContext value={dispatchExpense}>{children}</DispatchContext>
    </ExpenseContext>
  );
}

export function useExpense() {
  return useContext(ExpenseContext);
}

export function useExpenseDispatch() {
  return useContext(DispatchContext);
}

function expenseReducer(state, action) {
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

      if (expenseIndex < 0) {
        break;
      }
      const newExpenses = { expenses: [...state.expenses], id: state.id };

      newExpenses.expenses.splice(expenseIndex, 1, newExpense);
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
