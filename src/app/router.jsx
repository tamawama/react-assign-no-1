import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/login/Login";
import CreateExpense from "../features/create-expense/CreateExpense";
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/create", element: <CreateExpense /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default <RouterProvider router={router} />;
