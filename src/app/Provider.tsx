import { SidebarProvider } from "../contexts/SidebarContext";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
