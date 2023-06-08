import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function VehicleModelForm() {
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [manufacture, setManufacture] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePictureUrl = (event) => {
    setPictureUrl(event.target.value);
  };

  const handleManufacture = (event) => {
    setManufacture(event.target.value);
  };

  // fetch manufactures
  const [manufactures, setManufactures] = useState([]);
  async function fetchManufactures() {
    const response = await fetch("http://localhost:8100/api/manufacturers/");

    if (response.ok) {
      const data = await response.json();
      setManufactures(data.manufacturers);
    }
  }

  useEffect(() => {
    fetchManufactures();
  });

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const modeleData = {};
    modeleData.name = name;
    modeleData.picture_url = pictureUrl;
    modeleData.manufacturer_id = manufacture;

    const modelUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(modeleData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
      const newModel = response.json();

      setName("");
      setPictureUrl("");
      setManufacture("");

      // show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Model created successfully!",
      });
    } else {
      // show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a vehicle modal</h1>
          <form onSubmit={handleSubmit} id="create-model-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleName}
                value={name}
                placeholder="Model name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Model name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePictureUrl}
                value={pictureUrl}
                placeholder="Picture URL"
                required
                type="text"
                name="picture_url"
                id="picture_url"
                className="form-control"
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>

            <div className="mb-3">
              <select
                onChange={handleManufacture}
                value={manufacture}
                required
                name="manufacture_id"
                id="manufacture_id"
                className="form-select"
              >
                <option value="">Choose a manufacture</option>
                {manufactures.map((manufacture) => {
                  return (
                    <option key={manufacture.id} value={manufacture.id}>
                      {manufacture.name}
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

export default VehicleModelForm;
