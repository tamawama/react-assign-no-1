import Input from "../../components/Input";
import { login, signup } from "../../utils/expenseApi";
import styles from "./Auth.module.css";
import {
  Form,
  Link,
  useSearchParams,
  redirect,
  useActionData,
  ActionFunction,
} from "react-router-dom";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const authData = useActionData();

  return (
    <div className={styles.div}>
      {!isLogin && <h1>Create A New User</h1>}
      {isLogin && <h1>Log In</h1>}
      <Form method="post">
        <Input label="Email" />
        <Input label="Password" type="password" />
        <div className={styles.buttons}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Sign Up" : "Log In"}
          </Link>
          <button type="submit">Confirm</button>
        </div>
      </Form>
    </div>
  );
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | null> => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  const data = await request.formData();
  const authData = {
    email: String(data.get("Email")),
    password: String(data.get("Password")),
  };
  let response = null;
  if (mode === "login") {
    response = await login(authData);
  }
  if (mode === "signup") {
    response = await signup(authData);
  }

  // client side issues
  if (
    response!.status === 422 ||
    response!.status === 401 ||
    response!.status === 404
  ) {
    return response;
  }

  if (!response!.ok) {
    return new Response(
      JSON.stringify({ message: "Could not authenticate user." }),
      { status: 500 }
    );
  }

  const resData = await response!.json();
  const token = resData.token;
  localStorage.setItem("token", token);

  return redirect("/");
};
