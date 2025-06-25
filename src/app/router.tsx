import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as expensesLoader } from "../features/home/Home";
import AuthPage, { action as authAction } from "../features/login/AuthPage";
import CreateExpense, {
  action as createExpenseAction,
  loader as categoryLoader,
} from "../features/create-expense/CreateExpense";
import RootLayout from "./RootLayout";
import { loader as logout } from "../features/login/Logout";
import { authProtection, hasValidToken } from "../utils/auth";
import { ErrorBoundry } from "./routes/ErrorBoundry";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: hasValidToken,
    ErrorBoundary: ErrorBoundry,
    children: [
      { index: true, Component: Home, loader: expensesLoader },
      {
        loader: authProtection,
        children: [
          {
            path: "create",
            element: <CreateExpense />,
            action: createExpenseAction,
            loader: categoryLoader,
          },
        ],
      },

      { path: "auth", element: <AuthPage />, action: authAction },
      { path: "logout", loader: logout },
    ],
  },
]);

export default <RouterProvider router={router} />;
