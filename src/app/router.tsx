import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../features/home/Home";
import AuthPage, { action as authAction } from "../features/login/AuthPage";
import CreateExpense from "../features/create-expense/CreateExpense";
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
      { index: true, Component: Home },
      {
        loader: authProtection,
        children: [
          {
            path: "create",
            element: <CreateExpense />,
          },
        ],
      },

      { path: "auth", element: <AuthPage />, action: authAction },
      { path: "logout", loader: logout },
    ],
  },
]);

export default <RouterProvider router={router} />;
