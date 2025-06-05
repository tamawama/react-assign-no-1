import { useState } from "react";
import CreateExpense from "./components/CreateExpense";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import { ExpenseProvider } from "./contexts/ExpenseContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import ContextWrapper from "./contexts/ContextWrapper";

function App() {
  // replace with routing
  const [page, setPage] = useState("home");
  function handleSidebarClick(page) {
    setPage("page");
  }

  return (
    <ContextWrapper>
      <div className="div-container">
        <Header />
        {/* need to adjust css with the sidebar "aside" */}
        <main>
          <Sidebar setPage={setPage}></Sidebar>
          {page === "home" && <Home />}
          {page === "create" && <CreateExpense onCancel={setPage} />}
          {page === "login" && <Login pageHandler={setPage} />}
        </main>
      </div>
    </ContextWrapper>
  );
}

export default App;
