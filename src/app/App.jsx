import { useState } from "react";
import CreateExpense from "../features/create-expense/CreateExpense";
import Header from "../features/menu/Header";
import Home from "../features/home/Home";
import Sidebar from "../features/menu/Sidebar";
import Login from "../features/login/Login";
import Provider from "./Provider";

function App() {
  // replace with routing
  const [page, setPage] = useState("home");
  function handleSidebarClick(page) {
    setPage("page");
  }

  return (
    <Provider>
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
    </Provider>
  );
}

export default App;
