import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function AutomobileForm() {
  const [color, setSetcolor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");

  const handleColor = (event) => {
    setSetcolor(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handleVin = (event) => {
    setVin(event.target.value);
  };

  const handleModel = (event) => {
    setModel(event.target.value);
  };

  // fetch models
  const [models, setModels] = useState([]);
  async function fetchModels() {
    const response = await fetch("http://localhost:8100/api/models/");

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  }

  useEffect(() => {
    fetchModels();
  }, []);

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const automobileData = {};
    automobileData.color = color;
    automobileData.year = year;
    automobileData.vin = vin;
    automobileData.model_id = model;

    const autombileUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(automobileData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(autombileUrl, fetchConfig);
    if (response.ok) {
      const newAutomobile = await response.json();

      setSetcolor("");
      setYear("");
      setVin("");
      setModel("");

      // show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Automobile created successfully!",
      });
    } else {
      // show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "VIN already exists!",
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleColor}
                value={color}
                placeholder="Color"
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleYear}
                value={year}
                placeholder="Year"
                required
                type="number"
                name="year"
                id="year"
                className="form-control"
              />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleVin}
                value={vin}
                placeholder="VIN"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="VIN">VIN</label>
            </div>

            <div className="mb-3">
              <select
                onChange={handleModel}
                value={model}
                required
                name="model_id"
                id="model_id"
                className="form-select"
              >
                <option value="">Choose a model</option>
                {models.map((model) => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
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

export default AutomobileForm;
