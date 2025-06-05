import { ExpenseProvider } from "./ExpenseContext";
import { SidebarProvider } from "./SidebarContext";

export default function ContextWrapper({ children }) {
  return (
    <SidebarProvider>
      <ExpenseProvider>{children}</ExpenseProvider>
    </SidebarProvider>
  );
}
