import React, { useEffect, useState } from 'react'

function SalesHistory() {
    const [salespeople, setSalespeople] = useState([])
    const [selectedSalesperson, setSelectedSalesperson] = useState('')
    const [sales, setSales] = useState([])

    const fetchSalespeople = async () => {
        const response = await fetch('http://localhost:8090/api/salesperson/')
        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
        }
    }

    const fetchSales = async () => {
        const response = await fetch('http://localhost:8090/api/sales/')
        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
        }
    }

    useEffect(() => {
        fetchSalespeople()
        fetchSales()
    }, [])

    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(event.target.value)
    }

    const filteredSalesHistory = sales.filter(sale => sale.salesperson.id.toString() === selectedSalesperson)

    return (
        <>
            <h2 className="display-3 mt-5">Sales History</h2>
            <div className="mb-3">
                <select onChange={handleSalespersonChange} value={selectedSalesperson} className="form-select">
                    <option>Choose Salesperson</option>
                    {salespeople.map(salesperson => (
                        <option key={salesperson.id} value={salesperson.id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Automobile VIN</th>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSalesHistory.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default SalesHistory
