import Header from "./routes/nav/Header";
import Provider from "./Provider";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  // replace with routing

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <div className="div-container">
          <Header />
          {/* need to adjust css with the sidebar "aside" */}
          <main>{Router}</main>
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
