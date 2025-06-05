import { setSidebarState } from "../contexts/SidebarContext.jsx";
import styles from "./Header.module.css";

export default function Header() {
  const sidebarToggle = setSidebarState();
  function handleClick() {
    sidebarToggle((previousState) => !previousState);
  }
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Expense Tracker</h1>
      <button onClick={handleClick} className={styles.button} />
    </header>
  );
}
