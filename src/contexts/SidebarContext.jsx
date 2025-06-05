import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [sidebar, setSidebar] = useState(true);
  return (
    <SidebarContext value={{ sidebar, setSidebar }}>{children}</SidebarContext>
  );
}

export function getSidebarState() {
  return useContext(SidebarContext).sidebar;
}

export function setSidebarState() {
  const { setSidebar } = useContext(SidebarContext);
  return setSidebar;
}
