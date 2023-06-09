import React, { useState, useEffect } from 'react';

const SalesList = () => {
  const [sales, setSales] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/sales/');
      if (response.ok) {
        const data = await response.json();
        setSales(data.sales);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="offset-0 col-12 bg-info">
      <div className="shadow p-4 mt-4">
        <div className="flex justify-content-center">
          <h1 className="text-center text-white">List of Sales</h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Salesperson Name</th>
              <th className="text-center">Employee ID</th>
              <th className="text-center">Customer Name</th>
              <th className="text-center">Automobile VIN</th>
              <th className="text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => {
              return (
                <tr className="bg-light" key={index}>
                  <td className="text-center">{sale.salesperson.first_name}</td>
                  <td className="text-center">{sale.salesperson.employee_id}</td>
                  <td className="text-center">{sale.customer.first_name}</td>
                  <td className="text-center">{sale.automobile.vin}</td>
                  <td className="text-center">{sale.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesList;
