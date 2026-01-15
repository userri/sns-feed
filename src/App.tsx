import "./App.css";
import Feed from "./pages/Feed/Feed";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">📱 SNS Feed</h1>
        </div>
      </header>

      <main className="main">
        <Feed />
      </main>
    </div>
  );
}

export default App;
