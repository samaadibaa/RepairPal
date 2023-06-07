import React, { useEffect, useState } from "react";

function ListSalesPeopleForm() {
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState ("");

    const fetchSaleData = async () => {
      const url = 'http://localhost:8090/api/salesperson/';
      const response = await fetch(url);
      if (response.ok) {
          const data = await response.json()
          setSalespeople(data.salespeople);
      }
    };

  useEffect(() => {
      fetchSaleData()
    }, []);

    return (
        <div>
          <h1>Salespeople</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {salespeople.map((salesperson) => {
                return (
                  <tr key={salesperson.id}>
                    <td>{salesperson.employee_id}</td>
                    <td>{salesperson.first_name}</td>
                    <td>{salesperson.last_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

export default ListSalesPeopleForm;
