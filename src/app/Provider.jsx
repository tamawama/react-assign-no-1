import { SidebarProvider } from "../contexts/SidebarContext";

export default function Provider({ children }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
