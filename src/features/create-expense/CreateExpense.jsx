import Input from "../../components/Input";
import styles from "./CreateExpense.module.css";
import { useRef, memo } from "react";
import { useExpenseDispatch } from "../../contexts/ExpenseContext";
import { useNavigate } from "react-router-dom";

// memoizing here does nothing, function prop always changing on page change
const CreateExpense = memo(function CreateExpense() {
  const titleRef = useRef();
  const categoryRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const expenseContext = useExpenseDispatch();
  const navigator = useNavigate();

  function cancelHandler() {
    titleRef.current.value = "";
    categoryRef.current.value = "";
    amountRef.current.value = 0;
    dateRef.current.value = null;
    navigator("/");
  }

  function saveHandler() {
    const action = {
      type: "create",
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
      date: dateRef.current.value,
    };
    expenseContext(action);
    cancelHandler();
  }

  return (
    <div className={styles.div}>
      <Input label="Title" ref={titleRef} />
      <Input label="Category" ref={categoryRef} />
      <Input label="Expense Amount" type="number" ref={amountRef} />
      <Input label="Expense Date" type="date" ref={dateRef} />
      <div className={styles.buttons}>
        <button onClick={cancelHandler}>Cancel</button>
        <button onClick={saveHandler}>Save</button>
      </div>
    </div>
  );
});

export default CreateExpense;
