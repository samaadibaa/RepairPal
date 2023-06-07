import React, { useState, useEffect } from "react";

const SalesRecordForm = () => {
  const [automobiles, setAutomobiles] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formattedPrice, setFormattedPrice] = useState("");
  const [formData, setFormData] = useState({
    automobile: "",
    salesman: "",
    customer: "",
    price: "",
  });

  const fetchAutomobiles = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    } else {
      // Handle error
    }
  };

  const fetchSalesmen = async () => {
    const url = "http://localhost:8090/api/salesperson/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSalesmen(data.salespeople);
    } else {
      // Handle error
    }
  };

  const fetchCustomers = async () => {
    const url = "http://localhost:8090/api/customer/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    } else {
      // Handle error
    }
  };

  useEffect(() => {
    fetchAutomobiles();
    fetchSalesmen();
    fetchCustomers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({
        salesperson: formData.salesman,
        customer: formData.customer,
        automobile: formData.automobile,
        price: formattedPrice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          ...formData,
          automobile: data.automobile,
          salesman: data.salesperson,
          customer: data.customer,
          price: data.price,
        });
      } else {
        throw new Error("Response not OK");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;

    if (inputName === "price") {
      const price = parseFloat(value);
      setFormData({
        ...formData,
        price: price,
      });
      setFormattedPrice(
        price.toLocaleString("en-US", { style: "currency", currency: "USD" })
      );
    } else {
      setFormData({
        ...formData,
        [inputName]: value,
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a New Sale</h1>
          <form onSubmit={handleSubmit} id="create-sales-record-form">
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.automobile}
                required
                name="automobile"
                id="automobile
                "
                className="form-select"
              >
                <option value="">Choose an Automobile</option>
                {automobiles.map((automobile) => (
                  <option key={automobile.id} value={automobile.id}>
                    {automobile.vin}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.salesman}
                required
                name="salesman"
                id="salesman"
                className="form-select"
              >
                <option value="">Choose a Salesman</option>
                {salesmen.map((salesman) => (
                  <option key={salesman.id} value={salesman.id}>
                    {salesman.first_name} {salesman.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.customer}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="">Choose a Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.first_name} {customer.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.formattedPrice}
                placeholder="Price"
                required
                type="number"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Sale Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesRecordForm;

