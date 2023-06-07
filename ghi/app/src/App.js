import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianList from "./TechniciansPage";
import TechnicianForm from "./TechnicianForm";
import AppointmentsList from "./AppointmentsPage";
import AppointmentForm from "./AppointmentForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/" element={<TechnicianList />} />
          <Route path="technicians/create/" element={<TechnicianForm />} />
          <Route path="appointments/" element={<AppointmentsList />} />
          <Route path="appointments/create" element={<AppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
