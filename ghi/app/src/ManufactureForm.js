import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function ManufactureForm() {
  const [name, setName] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const manufactureData = {};
    manufactureData.name = name;

    const manufactureUrl = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(manufactureData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(manufactureUrl, fetchConfig);

    if (response.ok) {
      const newManufacture = response.json();

      setName("");

      // show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Manufacture created successfully!",
      });
    } else {
      // show error alert when passing in existing manufacture
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Manufacture already exist!",
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new manufacture</h1>
          <form onSubmit={handleSubmit} id="create-manufacture-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleName}
                value={name}
                placeholder="Manufacture name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Manufacture name</label>
            </div>

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufactureForm;
