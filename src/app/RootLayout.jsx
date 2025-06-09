import Sidebar from "../features/menu/Sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
