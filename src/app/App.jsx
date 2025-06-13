import Header from "./routes/nav/Header";
import Provider from "./Provider";
import Router from "./router";

function App() {
  // replace with routing

  return (
    <Provider>
      <div className="div-container">
        <Header />
        {/* need to adjust css with the sidebar "aside" */}
        <main>{Router}</main>
      </div>
    </Provider>
  );
}

export default App;
