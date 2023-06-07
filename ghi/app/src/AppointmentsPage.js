import React, { useState, useEffect } from "react";
import Moment from "moment";
import moment from "moment";

function AppointmentsList() {
  // fetch appointments
  const [appointments, setAppointments] = useState([]);
  async function fetchAppointments() {
    const response = await fetch("http://localhost:8080/api/appointments/");

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
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
      console.log(data);
      setAutomobiles(data.autos);
    }
  }

  useEffect(() => {
    fetchAutombiles();
  }, []);

  return (
    <div className="container">
      <h1>Service Appointments</h1>
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
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => {
            return (
              <tr key={app.id}>
                <td>{app.vin}</td>
                {automobiles.map((auto) => {
                  if (app.vin === auto.vin) {
                    return <td>Yes</td>;
                  } else {
                    return <td>No</td>;
                  }
                })}
                <td>{app.customer}</td>
                <td>{Moment(app.date).format("MMM D, YYYY")}</td>
                <td>{Moment(app.time, "HH:mm:ss").format("hh:mm A")}</td>
                <td>
                  {app.technician.first_name} {app.technician.last_name}
                </td>
                <td>{app.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsList;
