import React, { useState, useEffect } from "react";

function TechnicianList() {
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

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((tech) => {
            return (
              <tr key={tech.id}>
                <td>{tech.employee_id}</td>
                <td>{tech.first_name}</td>
                <td>{tech.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TechnicianList;
