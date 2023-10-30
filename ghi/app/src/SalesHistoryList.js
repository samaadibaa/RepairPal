import React, { useState, useEffect } from 'react'

function ServiceHistoryList() {
    const [appointments, setAppointments] = useState([])
    const [vin, setVin] = useState('')

    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/')
        console.log(response)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            setAppointments(data.appointments)
        } else {
            console.error("Response Invalid")
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleVinChange = (event) => {
        const value = event.target.value
        setVin(value)
    }

    const handleFilter = async () => {
        const filteredAppointments = appointments.filter(appointment=>appointment.vin === vin)
        setAppointments(filteredAppointments)
    }

    return (
        <>
        <h1 className='mt-5'>Service History</h1>
        <input onChange={handleVinChange} value={vin} type="text" placeholder="Filter by VIN"/>
        <button onClick={handleFilter}>Search</button>
        <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {appointments.map((appointment) => {
                    return (
                        <tr key={appointment.id}>
                            <td> {appointment.vin}</td>
                            <td> {appointment.customer}</td>
                            <td>{appointment.date_time}</td>
                            <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default ServiceHistoryList;
