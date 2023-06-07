import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function AppointmentForm() {
  // fetch technicians
  const [technicians, setTechnicians] = useState([]);
  async function fetchTechnicians() {
    const response = await fetch("http://localhost:8080/api/technicians/");

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  }

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [technician, setTechnician] = useState("");

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleTime = (event) => {
    setTime(event.target.value);
  };

  const handleReason = (event) => {
    setReason(event.target.value);
  };

  const handleVin = (event) => {
    setVin(event.target.value);
  };

  const handleCustomer = (event) => {
    setCustomer(event.target.value);
  };

  const handleTechnician = (event) => {
    setTechnician(event.target.value);
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // data to pass in
    const appointmentData = {};
    appointmentData.date = date;
    appointmentData.time = time;
    appointmentData.reason = reason;
    appointmentData.vin = vin;
    appointmentData.customer = customer;
    appointmentData.technician = technician;

    // POST
    const appointmentUrl = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(appointmentData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(appointmentUrl, fetchConfig);
    if (!response.ok) {
      // show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong...",
      });
    } else {
      const newAppointment = await response.json();

      // reset form to empty
      setDate("");
      setTime("");
      setReason("");
      setVin("");
      setCustomer("");
      setTechnician("");

      // show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your appointment is booked!",
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleDate}
                value={date}
                placeholder="Date"
                required
                type="date"
                name="date"
                id="date"
                className="form-control"
              />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleTime}
                value={time}
                placeholder="Time"
                required
                type="time"
                name="time"
                id="time"
                className="form-control"
              />
              <label htmlFor="time">Time</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleReason}
                value={reason}
                placeholder="Reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason for visit</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleVin}
                value={vin}
                placeholder="VIN"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleCustomer}
                value={customer}
                placeholder="Customer"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
              />
              <label htmlFor="customer">Customer Name</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleTechnician}
                value={technician}
                required
                name="technician"
                id="technician"
                className="form-select"
              >
                <option value="">Choose a technician</option>
                {technicians.map((tech) => {
                  return (
                    <option key={tech.id} value={tech.id}>
                      {tech.first_name} {tech.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
