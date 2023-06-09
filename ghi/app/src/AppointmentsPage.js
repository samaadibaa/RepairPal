import React, { useState, useEffect } from "react";
import Moment from "moment";

// mark appointment as 'canceled'
async function CancelAppointment(id) {
  const url = `http://localhost:8080/api/appointments/${id}/cancel`;
  const fetchConfig = {
    method: "PUT",
  };

  const response = await fetch(url, fetchConfig);

  if (!response.ok) {
    console.log("Unable to cancel appointment!");
  } else {
    const appointment = await response.json();
    console.log(appointment);
  }
  window.location.reload();
}

// mark appointment as 'finished'
async function FinishAppointment(id) {
  const url = `http://localhost:8080/api/appointments/${id}/finish`;
  const fetchConfig = {
    method: "PUT",
  };

  const response = await fetch(url, fetchConfig);

  if (!response.ok) {
    console.log("Unable to mark appointment as 'finished'!");
  } else {
    const appointment = await response.json();
    console.log(appointment);
  }
  window.location.reload();
}

// default function to show all appointments
function AppointmentsList() {
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

  // filter out only appointments with status = 'created'
  const filterActiveAppointments = () => {
    return appointments.filter(
      (appointment) => appointment.status === "created"
    );
  };

  return (
    <div className="container">
      <h1>Service Appointments</h1>
      {filterActiveAppointments().length === 0 && (
        <div className="alert alert-secondary" role="alert">
          No active appointments at the moment
        </div>
      )}
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
          {filterActiveAppointments().map((app) => {
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
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      onClick={() => CancelAppointment(app.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => FinishAppointment(app.id)}
                      type="button"
                      className="btn btn-success"
                    >
                      Finish
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsList;
