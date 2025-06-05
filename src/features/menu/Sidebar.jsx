import { getSidebarState } from "../../contexts/SidebarContext";
import styles from "./Sidebar.module.css";

export default function Sidebar({ setPage }) {
  const sidebarStatus = getSidebarState();
  return (
    sidebarStatus && (
      <aside className={styles.aside}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("create")}>Create New Expense</button>
        <button onClick={() => setPage("login")}>Signup</button>
      </aside>
    )
  );
}
