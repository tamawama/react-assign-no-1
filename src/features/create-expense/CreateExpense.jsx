import { Link, useLoaderData, redirect } from "react-router-dom";
import Input from "../../components/Input";
import styles from "./CreateExpense.module.css";
import { Form } from "react-router-dom";
import { createExpense, getCategories } from "../../utils/expenseApi";

// memoizing here does nothing, function prop always changing on page change
function CreateExpense() {
  const loaderData = useLoaderData();

  return (
    <div className={styles.div}>
      {!loaderData && (
        <h1>Issue fetching categories... please try again later</h1>
      )}
      {loaderData && (
        <Form method="POST">
          <Input label="Title" />
          <Input
            label="Category"
            type="select"
            options={loaderData.map((data) => {
              return { value: data.id, text: data.name };
            })}
          />
          <Input label="Expense Amount" type="number" step="0.01" />
          <div className={styles.buttons}>
            <Link to="/">Cancel</Link>
            <button type="submit">Save</button>
          </div>
        </Form>
      )}
    </div>
  );
}

export default CreateExpense;

export async function loader() {
  const response = await getCategories();
  if (!response.ok || response.status === 500) {
    alert("Error fetching categories");
    return null;
  }
  const resData = await response.json();

  return resData;
}

export async function action({ request }) {
  const formData = await request.formData();
  const expenseData = {
    title: formData.get("Title"),
    value: Number(formData.get("Expense Amount")),
    categoryId: Number(formData.get("Category")),
  };
  const response = await createExpense(expenseData);
  if (response.ok && response.status === 201) {
    const localData = JSON.parse(sessionStorage.getItem("expenses"));
    const newLocalExpense = {
      ...expenseData,
    };
    let newData = "";
    if (!localData || localData.invalid) {
      newData = JSON.stringify([newLocalExpense]);
    } else {
      newData = JSON.stringify([...localData, newLocalExpense]);
    }
    sessionStorage.setItem("expenses", newData);
    console.log("Action:", newData);

    return redirect("/");
  }
  if (!response.ok) {
    return new Response(
      JSON.stringify({ message: "Could not validate user-token" }),
      { status: 500 }
    );
  }
  return response;
}
