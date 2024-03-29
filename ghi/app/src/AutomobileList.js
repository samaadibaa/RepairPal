import React, { useState, useEffect } from "react";

function AutomobilesList() {
  const [automobiles, setAutomobiles] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/automobiles/");
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Automobiles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map((autos) => {
            return (
              <tr key={autos.id}>
                <td>{autos.vin}</td>
                <td>{autos.color}</td>
                <td>{autos.year}</td>
                <td>{autos.model.name}</td>
                <td>{autos.model.manufacturer.name}</td>
                <td>{autos.sold}</td>
                <td>{autos.sold === true ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AutomobilesList;
