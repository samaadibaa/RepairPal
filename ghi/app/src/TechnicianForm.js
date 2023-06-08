import React, { useState } from "react";
import Swal from "sweetalert2";

function TechnicianForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleEmployeeId = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data to pass in
    const technicianData = {};
    technicianData.first_name = firstName;
    technicianData.last_name = lastName;
    technicianData.employee_id = employeeId;

    // POST
    const techniciansUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(technicianData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(techniciansUrl, fetchConfig);

    if (!response.ok) {
      // show error alert when passing in existing employee id
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Employee ID already exist!",
      });
    } else {
      const newTechnician = await response.json();

      // reset form to empty
      setFirstName("");
      setLastName("");
      setEmployeeId("");

      // show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Technician created successfully!",
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new technician</h1>
          <form onSubmit={handleSubmit} id="create-technician-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstName}
                value={firstName}
                placeholder="First name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastName}
                value={lastName}
                placeholder="Last name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleEmployeeId}
                value={employeeId}
                placeholder="Employee ID"
                required
                type="text"
                name="employee_id"
                id="employee_id"
                className="form-control"
              />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;
