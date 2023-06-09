import { useEffect, useState } from "react";

function ListCustomer() {
    const [customer, setCustomer] = useState([]);

    const getData = async () => {
        const url = ('http://localhost:8090/api/customer/')
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomer(data.customers)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <div>
          <h1>Customers</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customer.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.phone_number}</td>
                    <td>{customer.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

export default ListCustomer;
