import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianList from "./TechniciansPage";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/" element={<TechnicianList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
