import { Suspense, useImperativeHandle, useRef } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import styles from "./EditModal.module.css";
import { updateExpense } from "../../utils/expenseApi";
import { Await, useNavigate } from "react-router-dom";

export type EditModalHandler = {
  open: (parameters: EditParameters) => void;
};

export interface EditParameters {
  title: string;
  category: { id: number; name: string };
  amount: number;
  id: number;
}

type category = {
  id: number;
  name: string;
};

export default function EditModal({
  ref,
  categories,
}: {
  categories: category[];
  ref: React.Ref<EditModalHandler>;
}) {
  const nav = useNavigate();

  const dialog = useRef<HTMLDialogElement>(null);
  const expenseId = useRef(NaN);
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open({ title, category, amount, id }: EditParameters) {
        expenseId.current = id;
        titleRef.current!.value = title;
        categoryRef.current!.value = String(category.id);
        amountRef.current!.value = String(amount);
        dialog.current!.showModal();
      },
    };
  });

  async function saveHandler() {
    const expenseData = {
      body: {
        title: titleRef.current!.value,
        categoryId: Number(categoryRef.current!.value),
        value: Number(amountRef.current!.value),
      },
      expenseId: expenseId.current,
    };
    const response = await updateExpense(
      expenseData.body,
      expenseData.expenseId
    );
    if (!response.ok) {
      alert("Issue editing expense.");
      return nav("/");
    }
    if (response.status === 500 || response.status === 404) {
      alert("Issue editing expense.");
      return nav("/");
    }
    return nav("/");
  }

  return (
    <dialog ref={dialog} className={styles.dialog}>
      {/* <div className={styles.flex}> */}
      {/* need to dynamicall adjust the spacer if the sidebar is out or not */}
      {/* <div className={styles.spacer} /> */}
      <div className={styles.center}>
        <div className={styles.modal}>
          <Input label="Title" ref={titleRef} />
          <Suspense fallback={<Input label="Category" type="fetching" />}>
            <Await resolve={categories}>
              <Select
                label="Category"
                type="select"
                options={categories.map((data) => {
                  return { value: data.id, text: data.name };
                })}
                ref={categoryRef}
              />
            </Await>
          </Suspense>

          <Input
            label="Expense Amount"
            type="number"
            ref={amountRef}
            step="0.01"
          />
          <form method="dialog" className={styles.buttons}>
            <button>Cancel</button>
            <Suspense fallback={<p>"loading..."</p>}>
              <Await resolve={categories}>
                <button onClick={saveHandler}>Save</button>
              </Await>
            </Suspense>
          </form>
        </div>
      </div>
      {/* </div> */}
    </dialog>
  );
}
