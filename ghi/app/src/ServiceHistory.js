import React, { useState, useEffect } from "react";
import Moment from "moment";

function ServiceHistory() {
  // fetch appointments
  const [appointments, setAppointments] = useState([]);
  async function fetchAppointments() {
    const response = await fetch("http://localhost:8080/api/appointments/");

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
      console.log(data.appointments);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  // fetch autombiles
  const [automobiles, setAutomobiles] = useState([]);
  async function fetchAutombiles() {
    const response = await fetch("http://localhost:8100/api/automobiles/");

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  }

  useEffect(() => {
    fetchAutombiles();
  }, []);

  // filter state variable and handler
  const [text, setText] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleSearch = () => {
    setSearchValue(text);
  };

  const filterAppointments = () => {
    return appointments.filter((apt) =>
      apt.vin.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <div className="container">
      <h1>Service History</h1>
      {appointments.length === 0 && (
        <div className="alert alert-secondary" role="alert">
          No active appointments at the moment
        </div>
      )}
      <div className="input-group mb-3">
        <input
          onChange={handleText}
          type="text"
          className="form-control"
          placeholder="Search by VIN..."
          aria-label="Search by VIN..."
          aria-describedby="button-addon2"
        />
        <button
          onClick={() => handleSearch()}
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Search
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>VIP Status</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filterAppointments().map((app) => {
            return (
              <tr key={app.id}>
                <td>{app.vin}</td>
                <td>
                  {automobiles.some((auto) => auto.vin === app.vin)
                    ? "Yes"
                    : "No"}
                </td>
                <td>{app.customer}</td>
                <td>{Moment(app.date).format("MMM D, YYYY")}</td>
                <td>{Moment(app.time, "HH:mm:ss").format("hh:mm A")}</td>
                <td>
                  {app.technician.first_name} {app.technician.last_name}
                </td>
                <td>{app.reason}</td>
                <td>{app.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
