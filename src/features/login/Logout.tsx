import { redirect } from "react-router-dom";
import { logout } from "../../utils/expenseApi";

export async function loader() {
  const response = await logout();
  if (!response.ok) {
    return response;
  }
  return redirect("/");
}
