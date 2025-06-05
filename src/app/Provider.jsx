import { ExpenseProvider } from "../contexts/ExpenseContext";
import { SidebarProvider } from "../contexts/SidebarContext";

export default function Provider({ children }) {
  return (
    <SidebarProvider>
      <ExpenseProvider>{children}</ExpenseProvider>
    </SidebarProvider>
  );
}
