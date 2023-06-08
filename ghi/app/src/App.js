import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianList from "./TechniciansPage";
import TechnicianForm from "./TechnicianForm";
import AppointmentsList from "./AppointmentsPage";
import AppointmentForm from "./AppointmentForm";
import ServiceHistory from "./ServiceHistory";
import ManufactureForm from "./ManufactureForm";
import VehicleModelForm from "./VehicleModelForm";
import AutomobileForm from "./AutomobileForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufactures/create" element={<ManufactureForm />} />
          <Route path="models/create" element={<VehicleModelForm />} />
          <Route path="automobiles/create" element={<AutomobileForm />} />
          <Route path="technicians/" element={<TechnicianList />} />
          <Route path="technicians/create" element={<TechnicianForm />} />
          <Route path="appointments/" element={<AppointmentsList />} />
          <Route path="appointments/create" element={<AppointmentForm />} />
          <Route path="appointments/history" element={<ServiceHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
