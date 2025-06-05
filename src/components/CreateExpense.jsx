import Input from "./Input";
import styles from "./CreateExpense.module.css";
import { useContext, useRef, memo } from "react";
import { ExpenseContext } from "../App";

// memoizing here does nothing, function prop always changing on page change
const CreateExpense = memo(function CreateExpense({ onCancel }) {
  const titleRef = useRef();
  const categoryRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const onSave = useContext(ExpenseContext);

  function cancelHandler() {
    titleRef.current.value = "";
    categoryRef.current.value = "";
    amountRef.current.value = 0;
    dateRef.current.value = null;
    onCancel("home");
  }

  function saveHandler() {
    const action = {
      type: "create",
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
      date: dateRef.current.value,
    };
    onSave(action);
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
