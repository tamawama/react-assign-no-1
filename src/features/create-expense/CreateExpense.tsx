import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import styles from "./CreateExpense.module.css";
import { createExpense, getCategories } from "../../utils/expenseApi";
import Select from "../../components/Select";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface CategoryData {
  id: number;
  name: string;
}

// memoizing here does nothing, function prop always changing on page change
function CreateExpense() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const postExpense = useMutation({ mutationFn: createExpense });
  const queryClient = useQueryClient();
  const nav = useNavigate();
  function post(formData: FormData) {
    const expenseData = {
      title: String(formData.get("Title")),
      value: Number(formData.get("Expense Amount")),
      categoryId: Number(formData.get("Category")),
    };
    postExpense.mutate(expenseData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
      },
    });
    nav("/");
  }

  return (
    <div className={styles.div}>
      {!categories && (
        <h1>Issue fetching categories... please try again later</h1>
      )}
      {categories.isFetched && !categories.isError && (
        <form action={post}>
          <Input label="Title" />
          <Select
            label="Category"
            type="select"
            options={
              categories.data?.map((data: CategoryData) => {
                return { value: data.id, text: data.name };
              }) || null
            }
          />
          <Input label="Expense Amount" type="number" step="0.01" />
          <div className={styles.buttons}>
            <Link to="/">Cancel</Link>
            <button type="submit">Save</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateExpense;

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const expenseData = {
//     title: String(formData.get("Title")),
//     value: Number(formData.get("Expense Amount")),
//     categoryId: Number(formData.get("Category")),
//   };

//     return redirect("/");

//   if (!response.ok) {
//     return new Response(
//       JSON.stringify({ message: "Could not validate user-token" }),
//       { status: 500 }
//     );
//   }
//   return response;
// }
