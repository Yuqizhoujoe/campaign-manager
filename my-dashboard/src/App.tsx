import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AccountSearch from "./layout/AccountSearch";
import Dashboard from "./layout/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/accounts/:accountId" element={<Dashboard />} />
          <Route path="/" element={<AccountSearch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
