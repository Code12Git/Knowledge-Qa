import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import WorkspacePage from "./pages/WorkspacePage";
import StatusPage from "./pages/StatusPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/status" element={<StatusPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
