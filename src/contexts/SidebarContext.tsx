import { createContext, useContext, useState } from "react";

interface ContextProps {
  children: React.ReactNode;
}

const SidebarContext = createContext<{
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function SidebarProvider(props: ContextProps) {
  const [sidebar, setSidebar] = useState(true);
  return (
    <SidebarContext value={{ sidebar, setSidebar }}>
      {props.children}
    </SidebarContext>
  );
}

export function getSidebarState(): boolean {
  const sidebar = useContext(SidebarContext);
  if (sidebar === null) {
    return false; //idk what else to do here
  }
  return sidebar.sidebar;
}

export function setSidebarState() {
  const setSidebar = useContext(SidebarContext);
  if (!setSidebar) {
    throw new Error("setSidebarState must be used within a Provider");
  }
  return setSidebar.setSidebar;
}
