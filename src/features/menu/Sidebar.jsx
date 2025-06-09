import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { getSidebarState } from "../../contexts/SidebarContext";

export default function Sidebar() {
  const sidebarStatus = getSidebarState();

  return (
    sidebarStatus && (
      <aside className={styles.aside}>
        <Link to={{ pathname: "/" }}>Home</Link>
        <Link to={{ pathname: "/create" }}>Create New Expense</Link>
        <Link to={{ pathname: "/login" }}>Signup</Link>
      </aside>
    )
  );
}
