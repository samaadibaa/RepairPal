import React, { useState, useEffect } from "react";

function SalesHistoryList() {
  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesman, setSelectedSalesman] = useState("");
  const [sales, setSales] = useState([]);

  const fetchSalesman = async () => {
    const url = "http://localhost:8090/api/salesperson/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    }
  };

  const fetchSales = async () => {
    const url = `http://localhost:8090/api/sales/`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      setSales(data.sales);
    }
  };

  const handleSalesmanChange = (event) => {
    const salesmanId = event.target.value;
    setSelectedSalesman(salesmanId);
    if (sales.length > 0) {
      setSales(sales.filter((sale) => salesmanId !== sale.salesperson.id));
    }
  };

  useEffect(() => {
    fetchSales();
    fetchSalesman();
  }, [selectedSalesman]);

  return (
    <div className="row">
      <div className="offset-1 col-11">
        <div className="shadow p-4 mt-4">
          <h1>Sales History List</h1>
          <div className="mb-3">
            <select
              onChange={handleSalesmanChange}
              value={selectedSalesman}
              required
              name="salesPerson"
              id="salesPerson"
              className="form-select"
            >
              <option value="">Choose a Salesman</option>
              {salespeople.length ? (
                salespeople.map((salesman) => (
                  <option key={salesman.id} value={salesman.id}>
                    {salesman.first_name + " " + salesman.last_name}
                  </option>
                ))
              ) : (
                <option disabled>No salespeople available</option>
              )}
            </select>
          </div>
          {selectedSalesman.length > 0 && (
            <div>
              <h2>Sales</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Salesperson ID</th>
                    <th>Salesman Name</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale, index) => (
                    <tr key={index}>
                      <td>{sale.salesperson.employee_id}</td>
                      <td>{sale.salesperson.first_name}</td>
                      <td>{sale.customer.first_name}</td>
                      <td>{sale.automobile.vin}</td>
                      <td>{sale.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesHistoryList;
