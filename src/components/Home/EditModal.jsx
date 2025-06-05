import { useContext, useImperativeHandle, useRef } from "react";
import Input from "../Input";
import styles from "./EditModal.module.css";
import { ExpenseContext } from "../../App";

export default function EditModal({ ref }) {
  const dialog = useRef();
  const expenseId = useRef(NaN);
  const expenseDispatch = useContext(ExpenseContext);
  const titleRef = useRef();
  const categoryRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open(title, category, amount, date, id) {
        expenseId.current = id;
        titleRef.current.value = title;
        categoryRef.current.value = category;
        amountRef.current.value = amount;
        dateRef.current.value = date;
        dialog.current.showModal();
      },
    };
  });

  function saveHandler() {
    const action = {
      type: "edit",
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
      date: dateRef.current.value,
      id: expenseId.current,
    };
    expenseDispatch(action);
  }

  return (
    <dialog ref={dialog} className={styles.dialog}>
      {/* <div className={styles.flex}> */}
      {/* need to dynamicall adjust the spacer if the sidebar is out or not */}
      {/* <div className={styles.spacer} /> */}
      <div className={styles.center}>
        <div className={styles.modal}>
          <Input label="Title" ref={titleRef} />
          <Input label="Category" ref={categoryRef} />
          <Input label="Expense Amount" type="number" ref={amountRef} />
          <Input label="Expense Date" type="date" ref={dateRef} />
          <form method="dialog" className={styles.buttons}>
            <button>Cancel</button>
            <button onClick={saveHandler}>Save</button>
          </form>
        </div>
      </div>
      {/* </div> */}
    </dialog>
  );
}
