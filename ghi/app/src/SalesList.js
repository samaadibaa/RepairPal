import React, { useEffect, useState } from 'react'

function SalesList() {
    const [sales, setSales] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/')

        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
        }
    }

    const deleteSale = async (id) => {
        const response = await fetch(`http://localhost:8090/api/sales/${id}`, {
            method: 'DELETE',
        })

        if (response.ok) {
            setSales(sales.filter((sale) => sale.id !== id))
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <h2 className='display-3 mt-5'>Sales</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Automobile VIN</th>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.price}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteSale(sale.id)} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )

}

export default SalesList

