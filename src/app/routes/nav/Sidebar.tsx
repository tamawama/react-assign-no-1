import { Link, NavLink, useLoaderData } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { getSidebarState } from "../../../contexts/SidebarContext";
import { hasValidToken } from "../../../utils/auth";

export default function Sidebar() {
  const sidebarStatus = getSidebarState();
  const isSignedIn = useLoaderData();

  return (
    sidebarStatus && (
      <aside className={styles.aside}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to={{ pathname: "/" }}
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to={{ pathname: "/create" }}
        >
          Create New Expense
        </NavLink>
        {!isSignedIn && (
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to={{ pathname: "/auth", search: "mode=login" }}
          >
            Log In
          </NavLink>
        )}
        {isSignedIn && (
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to={{ pathname: "/logout" }}
          >
            Log Out
          </NavLink>
        )}
      </aside>
    )
  );
}
